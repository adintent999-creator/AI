#!/usr/bin/env python3
"""
NirmanBazar — deploy-ready builder.

What it does
============
1. Reads `products.json`.
2. For every product whose `image_local` is missing, downloads the remote
   `image` URL into `assets/img/<12-hex>.<ext>` (content-addressable: same
   scheme already used in the repo, so existing committed images are kept
   as-is).
3. Updates every product's `image_local` field to point at the local file
   (or leaves it blank if the remote URL is dead / rate-limited).
4. Writes `products.json` back atomically.
5. Optionally starts a local HTTP server so you can preview the site.

Why this script exists
======================
The source CDN (`constructionmart.com.bd`) hot-link rate-limits requests.
Running this from Termux on your phone (or any other IP) is the easiest
way to fetch all 1,267 images and produce a fully self-contained,
deploy-ready folder you can upload to GitHub Pages, Netlify, Vercel,
Cloudflare Pages, or any static host.

Termux usage
============
    pkg install -y python git
    cd ~/storage/shared        # or anywhere with write permission
    git clone https://github.com/adintent999-creator/AI.git NirmanBazar
    cd NirmanBazar
    python build_deploy.py     # downloads everything (~10-30 min)
    python -m http.server 8000 # optional preview at http://localhost:8000

Re-run safe
===========
The script is idempotent. Already-downloaded images are skipped. If the
CDN throttles you, just run it again — only the missing files will be
fetched. After a few re-runs everything will be local.

No external Python packages needed (stdlib only: urllib, hashlib,
json, threading, mimetypes, time, os, sys, signal).
"""

from __future__ import annotations

import hashlib
import json
import mimetypes
import os
import signal
import sys
import threading
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

# ---------- config ----------
PRODUCTS_JSON = Path("products.json")
IMG_DIR = Path("assets/img")
USER_AGENT = (
    "Mozilla/5.0 (Linux; Android 13; Termux) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
)
TIMEOUT = int(os.environ.get("NB_TIMEOUT", "25"))
MAX_WORKERS = int(os.environ.get("NB_WORKERS", "4"))   # bump on a fast network: NB_WORKERS=10
RETRIES_PER_URL = int(os.environ.get("NB_RETRIES", "3"))
BACKOFF_SECONDS = (2, 5, 12)  # progressive
PROGRESS_EVERY = 25

# ---------- helpers ----------

_print_lock = threading.Lock()


def log(msg: str) -> None:
    with _print_lock:
        print(msg, flush=True)


def short_hash(url: str, n: int = 12) -> str:
    return hashlib.sha1(url.encode("utf-8")).hexdigest()[:n]


def guess_ext(url: str, content_type: str | None) -> str:
    # Prefer URL suffix
    lower = url.lower().split("?", 1)[0].split("#", 1)[0]
    for ext in (".jpeg", ".jpg", ".png", ".webp", ".gif", ".svg"):
        if lower.endswith(ext):
            return ext
    if content_type:
        ext = mimetypes.guess_extension(content_type.split(";", 1)[0].strip())
        if ext:
            # mimetypes returns ".jpe" for JPEG sometimes
            return ".jpeg" if ext == ".jpe" else ext
    return ".jpeg"


def already_local(rel_path: str | None) -> bool:
    return bool(rel_path) and Path(rel_path).is_file()


def fetch(url: str) -> tuple[bytes, str]:
    """Fetch url with retries; return (bytes, content_type)."""
    last_err = None
    for attempt in range(RETRIES_PER_URL):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": USER_AGENT,
                    "Accept": "image/*,*/*;q=0.8",
                    "Referer": "https://constructionmart.com.bd/",
                },
            )
            with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                ct = r.headers.get("Content-Type", "")
                data = r.read()
                if not data:
                    raise urllib.error.URLError("empty body")
                return data, ct
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, ConnectionError) as e:
            last_err = e
            if attempt < RETRIES_PER_URL - 1:
                time.sleep(BACKOFF_SECONDS[min(attempt, len(BACKOFF_SECONDS) - 1)])
    raise RuntimeError(f"failed after {RETRIES_PER_URL} attempts: {last_err}")


# ---------- main job ----------

def download_one(idx: int, p: dict) -> tuple[int, dict, str]:
    """Download one product's image; return (idx, mutated_listing, status)."""
    url = (p.get("image") or "").strip()
    local = p.get("image_local")
    if already_local(local):
        return idx, p, "kept"
    if not url or not url.startswith(("http://", "https://")):
        return idx, p, "no-url"

    h = short_hash(url)
    # Try to find an existing file with this hash regardless of extension.
    # Skip *.part temp files left from interrupted previous runs.
    for existing in IMG_DIR.glob(f"{h}.*"):
        if existing.name.endswith(".part"):
            try:
                existing.unlink()
            except OSError:
                pass
            continue
        p["image_local"] = str(existing).replace("\\", "/")
        return idx, p, "linked"

    try:
        data, ct = fetch(url)
    except Exception as e:
        return idx, p, f"fail:{e.__class__.__name__}"

    ext = guess_ext(url, ct)
    out_path = IMG_DIR / f"{h}{ext}"
    tmp_path = out_path.with_suffix(out_path.suffix + ".part")
    tmp_path.write_bytes(data)
    tmp_path.rename(out_path)
    p["image_local"] = str(out_path).replace("\\", "/")
    return idx, p, "ok"


def main() -> int:
    if not PRODUCTS_JSON.is_file():
        print(f"ERROR: {PRODUCTS_JSON} not found. Run from the repo root.", file=sys.stderr)
        return 2

    IMG_DIR.mkdir(parents=True, exist_ok=True)

    catalog = json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))
    listings = catalog.get("listings", [])
    total = len(listings)
    log(f"Loaded {total:,} listings from {PRODUCTS_JSON}")

    # Build the work list, then dedupe by URL so the same image is fetched only once
    # even if multiple products reference it. Listings sharing a URL all get pointed
    # at the same final local file.
    raw_todo = [
        (i, p) for i, p in enumerate(listings)
        if not already_local(p.get("image_local")) and (p.get("image") or "").startswith("http")
    ]
    by_url: dict[str, list[int]] = {}
    for i, p in raw_todo:
        by_url.setdefault(p["image"].strip(), []).append(i)
    unique_urls = list(by_url.keys())
    todo = [(by_url[u][0], listings[by_url[u][0]]) for u in unique_urls]
    dup_savings = len(raw_todo) - len(todo)

    log(f"To download (unique URLs): {len(todo):,}  ·  already local: {total - len(raw_todo):,}")
    if dup_savings:
        log(f"Deduped {dup_savings} listings sharing image URLs (will reuse each download).")
    log(f"Concurrency: {MAX_WORKERS}  ·  retries/URL: {RETRIES_PER_URL}\n")

    results = {"ok": 0, "kept": 0, "linked": 0, "no-url": 0, "fail": 0}
    failures: list[tuple[str, str]] = []
    interrupted = threading.Event()

    def handle_sigint(_sig, _frm):
        interrupted.set()
        log("\n[!] Ctrl-C received — finishing in-flight downloads, then saving progress.")

    signal.signal(signal.SIGINT, handle_sigint)

    started = time.monotonic()
    done = 0
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        futures = [ex.submit(download_one, i, p) for i, p in todo]
        for fut in as_completed(futures):
            if interrupted.is_set():
                for f in futures:
                    f.cancel()
                break
            try:
                idx, mutated, status = fut.result()
            except Exception as e:
                results["fail"] += 1
                failures.append(("?", f"executor: {e}"))
                done += 1
                continue
            listings[idx] = mutated
            # Mirror the resolved image_local to every other listing that shared this URL
            shared_url = (mutated.get("image") or "").strip()
            local_path = mutated.get("image_local")
            if local_path and shared_url and shared_url in by_url:
                for j in by_url[shared_url]:
                    if j != idx:
                        listings[j]["image_local"] = local_path
            key = status.split(":", 1)[0]
            results[key] = results.get(key, 0) + 1
            if status.startswith("fail"):
                failures.append((mutated.get("title", "?")[:60], status))
            done += 1
            if done % PROGRESS_EVERY == 0 or done == len(todo):
                pct = done / max(1, len(todo)) * 100
                elapsed = time.monotonic() - started
                rate = done / max(0.001, elapsed)
                eta = (len(todo) - done) / max(0.001, rate)
                log(f"  [{done:>5}/{len(todo):>5}] {pct:5.1f}%  "
                    f"ok={results['ok']:>4} linked={results['linked']:>4} "
                    f"fail={results['fail']:>3}  "
                    f"{rate:.1f}/s  ETA {eta/60:.1f} min")

    # Persist updated products.json
    catalog["listings"] = listings
    tmp = PRODUCTS_JSON.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(catalog, ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
    tmp.replace(PRODUCTS_JSON)

    log("\n=== Summary ===")
    for k, v in sorted(results.items()):
        log(f"  {k:<8}: {v:>5}")
    log(f"  total   : {sum(results.values()):>5}  (catalog total: {total:,})")

    if failures:
        log(f"\nFirst {min(15, len(failures))} failures:")
        for t, s in failures[:15]:
            log(f"  - {t}  ->  {s}")
        log(f"\nRun the script again to retry just the {results['fail']} failed downloads.")

    deploy_ready = results['fail'] == 0 and results['no-url'] == 0
    log("")
    if deploy_ready:
        log("[OK] All images local. Folder is fully deploy-ready.")
    else:
        log(f"[i] {results['fail'] + results['no-url']} items still without a local image.")
        log("    Re-run `python build_deploy.py` to retry; CDN rate-limits cleared after a wait.")

    log("\nNext steps:")
    log("  • Preview locally:   python -m http.server 8000")
    log("  • Deploy:            zip -r nirmanbazar.zip . -x '.git/*' '*.tmp' && upload to your host")
    log("  • Or: push to GitHub Pages / Netlify / Vercel / Cloudflare Pages — no build step needed.")
    return 0 if deploy_ready else 1


if __name__ == "__main__":
    sys.exit(main())
