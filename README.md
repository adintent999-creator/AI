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

## 📌 সেটআপের পর ব্যবহার (Usage After Setup)

| কমান্ড | কাজ |
|--------|------|
| `ollama-start` | Ollama সার্ভার চালু করুন |
| `ollama-stop` | Ollama সার্ভার বন্ধ করুন |
| `ollama-chat` | tinyllama মডেলের সাথে চ্যাট করুন |
| `ollama-chat phi3:mini` | phi3 মডেলের সাথে চ্যাট করুন |
| `ollama-pull <model>` | নতুন মডেল ডাউনলোড করুন |
| `ollama-list` | ইনস্টল করা মডেল দেখুন |
| `ollama-api` | REST API টেস্ট করুন |

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
| স্টোরেজ কম | `ollama-list` দিয়ে অপ্রয়োজনীয় মডেল মুছুন |
| সার্ভার চালু হচ্ছে না | `ollama-stop` দিয়ে আগে বন্ধ করে আবার `ollama-start` দিন |
| Termux ক্র্যাশ করছে | Termux notification-এ "Acquire wakelock" চালু করুন |

## 📖 আরও তথ্য

- [Ollama অফিসিয়াল ডকুমেন্টেশন](https://docs.ollama.com)
- [Ollama মডেল লাইব্রেরি](https://ollama.com/library)
- [Termux Wiki](https://wiki.termux.com)
- [Ollama REST API](https://docs.ollama.com/api)

## লাইসেন্স

MIT
