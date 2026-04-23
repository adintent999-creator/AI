#!/data/data/com.termux/files/usr/bin/bash
# =============================================================================
#  Ollama AI Assistant - Android Termux One-Click Setup
#  অ্যান্ড্রয়েড Termux-এর জন্য মাস্টার সেটআপ স্ক্রিপ্ট
#
#  Design goals:
#   - Idempotent: safe to re-run; skips work that is already done.
#   - Defensive: validates environment (arch, Termux, network) before acting.
#   - Non-interactive: works when piped via `curl ... | bash`.
#   - Self-verifying: ends with a health check against the running server.
# =============================================================================

set -Eeuo pipefail

# --- Colors / helpers --------------------------------------------------------
if [ -t 1 ]; then
  C_RESET=$'\033[0m'; C_BOLD=$'\033[1m'
  C_RED=$'\033[31m'; C_GREEN=$'\033[32m'; C_YELLOW=$'\033[33m'; C_BLUE=$'\033[34m'
else
  C_RESET=""; C_BOLD=""; C_RED=""; C_GREEN=""; C_YELLOW=""; C_BLUE=""
fi

log()  { printf '%s[INFO]%s %s\n'  "$C_BLUE"   "$C_RESET" "$*"; }
warn() { printf '%s[WARN]%s %s\n'  "$C_YELLOW" "$C_RESET" "$*" >&2; }
err()  { printf '%s[ERROR]%s %s\n' "$C_RED"    "$C_RESET" "$*" >&2; }
ok()   { printf '%s[ OK ]%s %s\n'  "$C_GREEN"  "$C_RESET" "$*"; }
step() { printf '\n%s==>%s %s%s%s\n' "$C_BLUE" "$C_RESET" "$C_BOLD" "$*" "$C_RESET"; }

on_error() {
  local ec=$? line=${1:-?}
  err "Step ব্যর্থ হয়েছে (exit=$ec, line=$line)।"
  err "সম্ভাব্য সমাধান:"
  err "  • ইন্টারনেট সংযোগ ঠিক আছে কিনা দেখুন"
  err "  • Termux-এ সর্বশেষ ভার্সন ব্যবহার করুন (F-Droid থেকে)"
  err "  • 'pkg update' আলাদাভাবে চালিয়ে দেখুন"
  err "  • আবার স্ক্রিপ্টটি চালান — এটি idempotent, যতটুকু হয়েছে তা ধরে রেখে continue করবে"
  exit "$ec"
}
trap 'on_error $LINENO' ERR

retry() {
  # retry <n> <cmd...> — exponential backoff for flaky network commands
  local n=$1; shift
  local i=1 delay=2
  until "$@"; do
    if [ "$i" -ge "$n" ]; then
      return 1
    fi
    warn "Attempt $i failed; retrying in ${delay}s..."
    sleep "$delay"
    i=$((i + 1))
    delay=$((delay * 2))
  done
}

# --- Banner ------------------------------------------------------------------
clear || true
cat <<'BANNER'
=============================================
  🤖 Ollama AI Assistant - Termux Setup
  অ্যান্ড্রয়েড ডিভাইসের জন্য মাস্টার সেটআপ
=============================================
BANNER

# --- Pre-flight checks -------------------------------------------------------
step "[0/9] পরিবেশ যাচাই (pre-flight)"

if [ -z "${PREFIX:-}" ] || [ ! -d "$PREFIX/bin" ]; then
  err "এই স্ক্রিপ্ট শুধুমাত্র Termux-এ চলবে। \$PREFIX পাওয়া যায়নি।"
  err "Termux ইনস্টল করুন: https://f-droid.org/en/packages/com.termux/"
  exit 1
fi
ok "Termux পরিবেশ শনাক্ত হয়েছে: $PREFIX"

ARCH="$(uname -m)"
case "$ARCH" in
  aarch64|arm64)
    ok "আর্কিটেকচার: $ARCH (সমর্থিত)"
    ;;
  armv7l|armv8l|arm)
    err "৩২-বিট ARM ($ARCH) Ollama সমর্থন করে না। ৬৪-বিট Android ডিভাইস লাগবে।"
    exit 1
    ;;
  x86_64|i686)
    warn "x86 আর্কিটেকচার ($ARCH) সনাক্ত হয়েছে — সাধারণত Android ইমুলেটর।"
    warn "কাজ করতে পারে কিন্তু পারফরম্যান্স কম হবে। চালিয়ে যাচ্ছি..."
    ;;
  *)
    err "অজানা আর্কিটেকচার: $ARCH"
    exit 1
    ;;
esac

if ! command -v curl >/dev/null 2>&1; then
  log "curl পাওয়া যায়নি — ইনস্টল করা হচ্ছে..."
  pkg install -y curl
fi

if ! retry 3 curl -fsS --max-time 10 https://registry.ollama.ai/ -o /dev/null 2>/dev/null \
   && ! retry 3 curl -fsS --max-time 10 https://github.com/ -o /dev/null 2>/dev/null; then
  warn "ইন্টারনেট সংযোগে সমস্যা মনে হচ্ছে। তবুও চেষ্টা করছি..."
fi

# --- Step 1: Wake-lock (Android-এ background kill এড়াতে) --------------------
step "[1/9] Wake-lock সক্রিয়করণ"
if command -v termux-wake-lock >/dev/null 2>&1; then
  termux-wake-lock 2>/dev/null || true
  ok "Wake-lock সক্রিয় — ডাউনলোডের সময় Android আপনাকে kill করবে না"
else
  warn "termux-wake-lock পাওয়া যায়নি (termux-api অপশনাল)"
fi

# --- Step 2: Storage permission ---------------------------------------------
step "[2/9] স্টোরেজ পারমিশন"
if [ ! -L "$HOME/storage" ]; then
  log "Android permission ডায়ালগ আসলে 'Allow' চাপুন..."
  termux-setup-storage 2>/dev/null || warn "termux-setup-storage ব্যর্থ — অপ্রয়োজনীয়, চালিয়ে যাচ্ছি"
  sleep 2
else
  ok "স্টোরেজ পারমিশন আগে থেকেই দেওয়া আছে"
fi

# --- Step 3: Termux mirror + package update ---------------------------------
step "[3/9] Termux মিরর ও প্যাকেজ আপডেট"
# কিছু মিরর 403/404 দেয়; ডিফল্ট সেট না থাকলে Grimler-এর বিশ্বস্ত মিরর ব্যবহার করি।
MIRROR_FILE="$PREFIX/etc/termux/mirrors/default"
if [ ! -f "$MIRROR_FILE" ] && [ -d "$PREFIX/etc/termux/mirrors" ]; then
  if [ -f "$PREFIX/etc/termux/mirrors/all/grimler" ]; then
    ln -sf "$PREFIX/etc/termux/mirrors/all/grimler" "$MIRROR_FILE" || true
  fi
fi

if ! retry 3 pkg update -y; then
  warn "pkg update ব্যর্থ — termux-change-repo চালিয়ে আবার চেষ্টা করুন"
  exit 1
fi
retry 2 pkg upgrade -y || warn "pkg upgrade সম্পূর্ণ হয়নি — চালিয়ে যাচ্ছি"
ok "প্যাকেজ তালিকা আপডেট হয়েছে"

# --- Step 4: Required packages (minimal — শুধু যা সত্যিই দরকার) --------------
step "[4/9] প্রয়োজনীয় প্যাকেজ ইনস্টল"
REQUIRED_PKGS=(proot-distro curl wget git python jq)
TO_INSTALL=()
for p in "${REQUIRED_PKGS[@]}"; do
  if ! dpkg -s "$p" >/dev/null 2>&1; then
    TO_INSTALL+=("$p")
  fi
done
if [ "${#TO_INSTALL[@]}" -gt 0 ]; then
  log "ইনস্টল করা হচ্ছে: ${TO_INSTALL[*]}"
  retry 3 pkg install -y "${TO_INSTALL[@]}"
else
  ok "সব প্রয়োজনীয় প্যাকেজ আগে থেকেই ইনস্টল আছে"
fi

# --- Step 5: Ubuntu via proot-distro (idempotent) ----------------------------
step "[5/9] Ubuntu (proot-distro) সেটআপ"
UBUNTU_ROOT="$PREFIX/var/lib/proot-distro/installed-rootfs/ubuntu"
if [ -d "$UBUNTU_ROOT" ] && [ -x "$UBUNTU_ROOT/usr/bin/apt" ]; then
  ok "Ubuntu আগে থেকেই ইনস্টল আছে"
else
  log "Ubuntu rootfs ডাউনলোড ও ইনস্টল হচ্ছে (প্রায় 100MB)..."
  retry 3 proot-distro install ubuntu
fi

# --- Step 6: Ollama install inside Ubuntu (idempotent) -----------------------
step "[6/9] Ubuntu-এর ভিতরে Ollama ইনস্টল"
if proot-distro login ubuntu -- bash -c 'command -v ollama >/dev/null 2>&1'; then
  ok "Ollama আগে থেকেই ইনস্টল আছে"
else
  log "Ollama ডাউনলোড করা হচ্ছে (~300MB, নেটওয়ার্ক-নির্ভর)..."
  proot-distro login ubuntu -- bash -c '
    set -e
    export DEBIAN_FRONTEND=noninteractive
    apt-get update -y -q
    apt-get install -y -q curl ca-certificates
    # Ollama-র official installer proot-এ systemd খুঁজে পাবে না — স্বাভাবিক, skip করবে
    curl -fsSL https://ollama.com/install.sh | sh
  '
  ok "Ollama ইনস্টল সম্পন্ন"
fi

# --- Step 7: Launcher scripts তৈরি -------------------------------------------
step "[7/9] Helper কমান্ড তৈরি"
BIN="$PREFIX/bin"
OLLAMA_HOME="$HOME/.ollama-runtime"
mkdir -p "$OLLAMA_HOME"

# ---- ollama-start -----------------------------------------------------------
cat > "$BIN/ollama-start" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
# Ollama সার্ভার background-এ চালু করে। Idempotent.
set -e
OLLAMA_HOME="$HOME/.ollama-runtime"
mkdir -p "$OLLAMA_HOME"
PIDFILE="$OLLAMA_HOME/ollama.pid"
LOGFILE="$OLLAMA_HOME/ollama.log"

if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
  echo "✅ Ollama সার্ভার আগে থেকেই চালু আছে (PID $(cat "$PIDFILE"))"
  echo "   http://localhost:11434"
  exit 0
fi

command -v termux-wake-lock >/dev/null 2>&1 && termux-wake-lock 2>/dev/null || true

echo "Ollama সার্ভার চালু হচ্ছে..."
nohup proot-distro login ubuntu -- bash -c \
  'export OLLAMA_HOST=127.0.0.1:11434; exec ollama serve' \
  >"$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"

# সার্ভার ready হওয়ার জন্য অপেক্ষা (max 30s)
for i in $(seq 1 30); do
  if curl -fsS --max-time 1 http://localhost:11434/ >/dev/null 2>&1; then
    echo "✅ Ollama সার্ভার চালু: http://localhost:11434"
    echo "   PID: $(cat "$PIDFILE")"
    echo "   Log: $LOGFILE"
    echo ""
    echo "কমান্ডসমূহ:"
    echo "  ollama-chat            → মডেলের সাথে চ্যাট"
    echo "  ollama-pull <model>    → মডেল ডাউনলোড"
    echo "  ollama-list            → ইনস্টলকৃত মডেল"
    echo "  ollama-status          → সার্ভার স্ট্যাটাস"
    echo "  ollama-logs            → সার্ভার লগ"
    echo "  ollama-stop            → সার্ভার বন্ধ"
    exit 0
  fi
  sleep 1
done
echo "❌ সার্ভার ৩০ সেকেন্ডেও ready হয়নি। লগ দেখুন: ollama-logs"
exit 1
SCRIPT
chmod +x "$BIN/ollama-start"

# ---- ollama-stop ------------------------------------------------------------
cat > "$BIN/ollama-stop" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
PIDFILE="$HOME/.ollama-runtime/ollama.pid"
if [ -f "$PIDFILE" ]; then
  PID="$(cat "$PIDFILE")"
  kill "$PID" 2>/dev/null || true
  rm -f "$PIDFILE"
fi
pkill -f "ollama serve"   2>/dev/null || true
pkill -f "proot.*ubuntu" 2>/dev/null || true
command -v termux-wake-unlock >/dev/null 2>&1 && termux-wake-unlock 2>/dev/null || true
echo "✅ Ollama সার্ভার বন্ধ হয়েছে।"
SCRIPT
chmod +x "$BIN/ollama-stop"

# ---- ollama-status ----------------------------------------------------------
cat > "$BIN/ollama-status" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
PIDFILE="$HOME/.ollama-runtime/ollama.pid"
if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
  echo "✅ Running (PID $(cat "$PIDFILE"))"
else
  echo "❌ Not running"
  exit 1
fi
if curl -fsS --max-time 2 http://localhost:11434/ >/dev/null 2>&1; then
  echo "✅ API reachable: http://localhost:11434"
else
  echo "⚠️  Process চলছে কিন্তু API এ উত্তর নেই"
fi
SCRIPT
chmod +x "$BIN/ollama-status"

# ---- ollama-logs ------------------------------------------------------------
cat > "$BIN/ollama-logs" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
LOGFILE="$HOME/.ollama-runtime/ollama.log"
if [ ! -f "$LOGFILE" ]; then
  echo "লগ ফাইল নেই। আগে ollama-start চালান।"
  exit 1
fi
exec tail -n "${1:-200}" -F "$LOGFILE"
SCRIPT
chmod +x "$BIN/ollama-logs"

# ---- ollama-chat ------------------------------------------------------------
cat > "$BIN/ollama-chat" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
MODEL="${1:-tinyllama}"
echo "🤖 $MODEL মডেলের সাথে চ্যাট শুরু হচ্ছে..."
exec proot-distro login ubuntu -- bash -c "ollama run '$MODEL'"
SCRIPT
chmod +x "$BIN/ollama-chat"

# ---- ollama-pull ------------------------------------------------------------
cat > "$BIN/ollama-pull" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
if [ -z "${1:-}" ]; then
  cat <<'USAGE'
ব্যবহার: ollama-pull <model-name>

জনপ্রিয় মডেল (অ্যান্ড্রয়েডের জন্য উপযুক্ত):
  tinyllama         1.1B (637MB)   সবচেয়ে হালকা
  gemma3:1b         1B   (815MB)   Google-এর হালকা
  qwen2.5:1.5b      1.5B (986MB)   দ্রুত ও কার্যকর
  deepseek-r1:1.5b  1.5B (1.1GB)   রিজনিং
  llama3.2:1b       1B   (1.3GB)   Meta-এর ছোট মডেল
  phi3:mini         3.8B (2.3GB)   ভালো মানের ছোট মডেল
USAGE
  exit 1
fi
echo "📥 $1 মডেল ডাউনলোড করা হচ্ছে..."
proot-distro login ubuntu -- bash -c "ollama pull '$1'"
echo "✅ $1 ডাউনলোড সম্পন্ন!"
SCRIPT
chmod +x "$BIN/ollama-pull"

# ---- ollama-list ------------------------------------------------------------
cat > "$BIN/ollama-list" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
echo "📋 ইনস্টল করা মডেলসমূহ:"
proot-distro login ubuntu -- bash -c "ollama list"
SCRIPT
chmod +x "$BIN/ollama-list"

# ---- ollama-api (jq দিয়ে safe JSON escaping) --------------------------------
cat > "$BIN/ollama-api" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
MODEL="${1:-tinyllama}"
PROMPT="${2:-Hello, how are you?}"
if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq পাওয়া যায়নি। চালান: pkg install jq"
  exit 1
fi
PAYLOAD=$(jq -n --arg m "$MODEL" --arg p "$PROMPT" \
  '{model:$m, messages:[{role:"user", content:$p}], stream:false}')
echo "🔗 API দিয়ে $MODEL-এ প্রশ্ন পাঠানো হচ্ছে..."
curl -fsS http://localhost:11434/api/chat -d "$PAYLOAD" \
  | jq . 2>/dev/null \
  || echo "❌ সার্ভার চালু নেই? 'ollama-start' চালান।"
SCRIPT
chmod +x "$BIN/ollama-api"

# ---- ollama-uninstall -------------------------------------------------------
cat > "$BIN/ollama-uninstall" <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
echo "⚠️  এটি Ollama, সমস্ত মডেল, এবং helper কমান্ড মুছে ফেলবে।"
echo -n "নিশ্চিত? [y/N] "
read -r ans
[ "$ans" = "y" ] || [ "$ans" = "Y" ] || { echo "বাতিল।"; exit 0; }
ollama-stop 2>/dev/null || true
proot-distro remove ubuntu 2>/dev/null || true
rm -rf "$HOME/.ollama-runtime"
for f in ollama-start ollama-stop ollama-status ollama-logs ollama-chat \
         ollama-pull ollama-list ollama-api ollama-uninstall; do
  rm -f "$PREFIX/bin/$f"
done
echo "✅ সম্পূর্ণরূপে uninstall করা হয়েছে।"
SCRIPT
chmod +x "$BIN/ollama-uninstall"

ok "৯টি helper কমান্ড তৈরি হয়েছে"

# --- Step 8: ডিফল্ট মডেল pre-pull + Python SDK -------------------------------
step "[8/9] ডিফল্ট মডেল ও Python SDK"

# মডেল আগে থেকে pull করা থাকলে skip
if proot-distro login ubuntu -- bash -c 'ollama list 2>/dev/null | grep -q "^tinyllama"'; then
  ok "tinyllama আগে থেকেই ডাউনলোড করা আছে"
else
  log "tinyllama (637MB) ডাউনলোড হচ্ছে..."
  proot-distro login ubuntu -- bash -c '
    set -e
    export OLLAMA_HOST=127.0.0.1:11434
    nohup ollama serve >/tmp/ollama-pull.log 2>&1 &
    PID=$!
    for i in $(seq 1 30); do
      curl -fsS --max-time 1 http://localhost:11434/ >/dev/null 2>&1 && break
      sleep 1
    done
    ollama pull tinyllama
    kill "$PID" 2>/dev/null || true
  ' || warn "tinyllama pull ব্যর্থ — পরে 'ollama-pull tinyllama' চালিয়ে নেবেন"
fi

# Python SDK — Termux-এর newer Python PEP-668 enforce করে
if command -v pip >/dev/null 2>&1; then
  log "Python ollama SDK ইনস্টল করা হচ্ছে..."
  pip install --quiet --upgrade ollama 2>/dev/null \
    || pip install --quiet --upgrade --break-system-packages ollama 2>/dev/null \
    || warn "Python SDK ইনস্টল করা যায়নি — ঐচ্ছিক, পরে 'pip install ollama' চালান"
fi

# --- Step 9: চূড়ান্ত স্বাস্থ্য পরীক্ষা --------------------------------------
step "[9/9] Health check"
if bash "$BIN/ollama-start" >/dev/null 2>&1; then
  if curl -fsS --max-time 5 http://localhost:11434/ >/dev/null 2>&1; then
    ok "Ollama সার্ভার সফলভাবে সাড়া দিচ্ছে"
  else
    warn "সার্ভার চালু হয়েছে কিন্তু API responding না — 'ollama-logs' দেখুন"
  fi
else
  warn "সার্ভার auto-start ব্যর্থ — ম্যানুয়ালি 'ollama-start' চালান"
fi

# --- Done --------------------------------------------------------------------
cat <<BANNER

=============================================
  ${C_GREEN}✅ Ollama AI Assistant সেটআপ সম্পন্ন!${C_RESET}
=============================================

📌 ${C_BOLD}কমান্ড${C_RESET}:
─────────────────────────────────────────────
  ollama-start            → সার্ভার চালু
  ollama-stop             → সার্ভার বন্ধ
  ollama-status           → স্ট্যাটাস দেখুন
  ollama-logs             → লগ দেখুন (live tail)
  ollama-chat             → tinyllama দিয়ে চ্যাট
  ollama-chat phi3:mini   → অন্য মডেল দিয়ে চ্যাট
  ollama-pull <model>     → নতুন মডেল ডাউনলোড
  ollama-list             → মডেল তালিকা
  ollama-api              → REST API কল
  ollama-uninstall        → পুরোপুরি uninstall
─────────────────────────────────────────────

🚀 ${C_BOLD}শুরু করতে${C_RESET}:
   ollama-chat

📱 ${C_BOLD}প্রস্তাবিত মডেল${C_RESET}:
   tinyllama     637MB   2GB+ RAM
   gemma3:1b     815MB   3GB+ RAM
   phi3:mini     2.3GB   4GB+ RAM

স্ক্রিপ্ট যেকোনো সময় আবার চালানো নিরাপদ — idempotent।
=============================================
BANNER
