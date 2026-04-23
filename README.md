<p align="center">
  <a href="https://ollama.com">
    <img src="https://github.com/ollama/ollama/assets/3325447/0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7" alt="ollama" width="200"/>
  </a>
</p>

# Ollama AI Assistant - Android Termux Setup

অ্যান্ড্রয়েড ডিভাইসে Termux অ্যাপের মাধ্যমে Ollama AI অ্যাসিস্ট্যান্ট সেটআপ করুন।

## প্রয়োজনীয়তা (Requirements)

- অ্যান্ড্রয়েড ৭.০+ ডিভাইস
- কমপক্ষে ২ জিবি RAM (tinyllama মডেলের জন্য)
- কমপক্ষে ৩ জিবি ফ্রি স্টোরেজ
- [Termux অ্যাপ](https://f-droid.org/en/packages/com.termux/) (F-Droid থেকে ডাউনলোড করুন, Play Store ভার্সন আউটডেটেড)

## ⚡ ওয়ান-ক্লিক সেটআপ (One-Click Setup)

Termux অ্যাপ খুলুন এবং নিচের কমান্ডটি কপি করে পেস্ট করুন, তারপর Enter চাপুন:

```bash
curl -fsSL https://raw.githubusercontent.com/adintent999-creator/AI/main/termux-setup.sh | bash
```

ব্যস! সম্পূর্ণ সেটআপ অটোমেটিক হয়ে যাবে। ✅

## ✨ এই সেটআপে কী আছে (What you get)

- **ইডেম্পোটেন্ট** — একই কমান্ড বারবার চালানো নিরাপদ; যা ইতিমধ্যে হয়েছে তা skip করে।
- **Self-verifying** — শেষে automatic health check চলে।
- **Architecture & Termux validation** — ভুল পরিবেশে চালালে পরিষ্কার error দেয়।
- **Wake-lock** — Android যাতে background-এ ollama kill না করে।
- **Retry logic** — flaky network-এ exponential backoff দিয়ে আবার চেষ্টা করে।
- **Safe JSON** — `ollama-api` কমান্ড `jq` দিয়ে escape করে, তাই quote-ওয়ালা prompt-এ ভাঙে না।
- **Log + PID file** — `~/.ollama-runtime/` এ background সার্ভার ট্র্যাক করা হয়।
- **Minimal deps** — শুধু যা দরকার: `proot-distro curl wget git python jq`।

## 📌 সেটআপের পর ব্যবহার (Usage After Setup)

| কমান্ড | কাজ |
|--------|------|
| `ollama-start` | Ollama সার্ভার background-এ চালু করুন (idempotent) |
| `ollama-stop` | Ollama সার্ভার বন্ধ করুন |
| `ollama-status` | সার্ভার চলছে কিনা দেখুন |
| `ollama-logs` | live সার্ভার লগ দেখুন (tail -F) |
| `ollama-chat` | tinyllama মডেলের সাথে চ্যাট করুন |
| `ollama-chat phi3:mini` | phi3 মডেলের সাথে চ্যাট করুন |
| `ollama-pull <model>` | নতুন মডেল ডাউনলোড করুন |
| `ollama-list` | ইনস্টল করা মডেল দেখুন |
| `ollama-api <model> "<prompt>"` | REST API কল (jq দিয়ে safe) |
| `ollama-uninstall` | Ollama + Ubuntu + সব মডেল মুছে ফেলুন |

## 📱 অ্যান্ড্রয়েডের জন্য প্রস্তাবিত মডেল

| মডেল | সাইজ | ন্যূনতম RAM | বিবরণ |
|-------|-------|-------------|--------|
| `tinyllama` | 637MB | 2GB | সবচেয়ে হালকা, দ্রুত |
| `gemma3:1b` | 815MB | 3GB | Google-এর হালকা মডেল |
| `qwen2.5:1.5b` | 986MB | 3GB | দ্রুত ও কার্যকর |
| `deepseek-r1:1.5b` | 1.1GB | 3GB | রিজনিং মডেল |
| `llama3.2:1b` | 1.3GB | 3GB | Meta-এর ছোট মডেল |
| `phi3:mini` | 2.3GB | 4GB | ভালো মানের ছোট মডেল |
| `gemma3` | 3.3GB | 6GB | Google-এর স্ট্যান্ডার্ড মডেল |

### মডেল ডাউনলোড করতে:
```bash
ollama-pull tinyllama
ollama-pull phi3:mini
ollama-pull gemma3:1b
```

## 🔗 REST API ব্যবহার

সার্ভার চালু থাকলে (`ollama-start`), আপনি API দিয়ে মডেলের সাথে কথা বলতে পারবেন:

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "tinyllama",
  "messages": [{"role": "user", "content": "তুমি কে?"}],
  "stream": false
}'
```

অথবা শর্টকাট কমান্ড:
```bash
ollama-api tinyllama "তুমি কে?"
```

## 🐍 Python দিয়ে ব্যবহার

```python
from ollama import chat

response = chat(
    model='tinyllama',
    messages=[{'role': 'user', 'content': 'তুমি কে?'}],
)
print(response.message.content)
```

## ⚠️ সমস্যা সমাধান (Troubleshooting)

| সমস্যা | সমাধান |
|---------|--------|
| `proot-distro: command not found` | `pkg install proot-distro` চালান |
| মডেল খুব ধীর চলছে | ছোট মডেল ব্যবহার করুন (tinyllama) |
| স্টোরেজ কম | `ollama list` → `ollama rm <model>` দিয়ে অপ্রয়োজনীয় মডেল মুছুন |
| সার্ভার চালু হচ্ছে না | `ollama-logs` চালিয়ে error দেখুন, তারপর `ollama-stop && ollama-start` |
| `pkg update` ব্যর্থ | `termux-change-repo` দিয়ে মিরর পরিবর্তন করুন |
| `curl: (7) Failed to connect` | ইন্টারনেট চেক করুন; VPN চালু থাকলে বন্ধ করে চেষ্টা করুন |
| Termux ক্র্যাশ করছে | `termux-wake-lock` চালান (স্ক্রিপ্ট automatic করে) |
| একবার ফেইল হলে | শুধু `curl ... | bash` কমান্ডটি আবার চালান — idempotent |

## 📖 আরও তথ্য

- [Ollama অফিসিয়াল ডকুমেন্টেশন](https://docs.ollama.com)
- [Ollama মডেল লাইব্রেরি](https://ollama.com/library)
- [Termux Wiki](https://wiki.termux.com)
- [Ollama REST API](https://docs.ollama.com/api)

## লাইসেন্স

MIT
