#!/data/data/com.termux/files/usr/bin/bash
set -e

# =============================================
#  Ollama AI Assistant - Android Termux Setup
#  ওয়ান-ক্লিক মাস্টার সেটআপ
# =============================================

clear
echo "============================================="
echo "  🤖 Ollama AI Assistant - Termux Setup"
echo "  অ্যান্ড্রয়েড ডিভাইসের জন্য মাস্টার সেটআপ"
echo "============================================="
echo ""

# --- Step 1: Termux স্টোরেজ পারমিশন ---
echo "[1/8] স্টোরেজ পারমিশন সেটআপ করা হচ্ছে..."
termux-setup-storage 2>/dev/null || true
sleep 2

# --- Step 2: প্যাকেজ আপডেট ও আপগ্রেড ---
echo "[2/8] Termux প্যাকেজ আপডেট করা হচ্ছে..."
pkg update -y && pkg upgrade -y

# --- Step 3: প্রয়োজনীয় প্যাকেজ ইনস্টল ---
echo "[3/8] প্রয়োজনীয় প্যাকেজ ইনস্টল করা হচ্ছে..."
pkg install -y proot-distro curl wget git python nodejs cmake golang clang make

# --- Step 4: proot-distro দিয়ে Ubuntu ইনস্টল ---
echo "[4/8] Ubuntu (proot-distro) ইনস্টল করা হচ্ছে..."
proot-distro install ubuntu 2>/dev/null || echo "Ubuntu ইতিমধ্যে ইনস্টল আছে।"

# --- Step 5: Ubuntu-এর ভিতরে Ollama ইনস্টল ---
echo "[5/8] Ubuntu-এর ভিতরে Ollama ইনস্টল করা হচ্ছে..."
proot-distro login ubuntu -- bash -c '
  apt update -y && apt upgrade -y
  apt install -y curl ca-certificates
  curl -fsSL https://ollama.com/install.sh | sh
'

# --- Step 6: Ollama লঞ্চ স্ক্রিপ্ট তৈরি ---
echo "[6/8] Ollama লঞ্চ স্ক্রিপ্ট তৈরি করা হচ্ছে..."

# ollama-start: Ollama সার্ভার চালু করার স্ক্রিপ্ট
cat > $PREFIX/bin/ollama-start << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
echo "Ollama সার্ভার চালু হচ্ছে..."
proot-distro login ubuntu -- bash -c 'ollama serve' &
sleep 5
echo "✅ Ollama সার্ভার চালু আছে: http://localhost:11434"
echo ""
echo "ব্যবহার:"
echo "  ollama-chat        → মডেলের সাথে চ্যাট করুন"
echo "  ollama-pull <model> → নতুন মডেল ডাউনলোড করুন"
echo "  ollama-list        → ইনস্টল করা মডেল দেখুন"
echo "  ollama-stop        → সার্ভার বন্ধ করুন"
SCRIPT
chmod +x $PREFIX/bin/ollama-start

# ollama-stop: Ollama সার্ভার বন্ধ করার স্ক্রিপ্ট
cat > $PREFIX/bin/ollama-stop << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
echo "Ollama সার্ভার বন্ধ করা হচ্ছে..."
pkill -f "ollama serve" 2>/dev/null
echo "✅ Ollama সার্ভার বন্ধ হয়েছে।"
SCRIPT
chmod +x $PREFIX/bin/ollama-stop

# ollama-chat: মডেলের সাথে চ্যাট করার স্ক্রিপ্ট
cat > $PREFIX/bin/ollama-chat << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
MODEL=${1:-"tinyllama"}
echo "🤖 $MODEL মডেলের সাথে চ্যাট শুরু হচ্ছে..."
proot-distro login ubuntu -- bash -c "ollama run $MODEL"
SCRIPT
chmod +x $PREFIX/bin/ollama-chat

# ollama-pull: মডেল ডাউনলোড করার স্ক্রিপ্ট
cat > $PREFIX/bin/ollama-pull << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
if [ -z "$1" ]; then
  echo "ব্যবহার: ollama-pull <model-name>"
  echo ""
  echo "জনপ্রিয় মডেল (অ্যান্ড্রয়েডের জন্য উপযুক্ত):"
  echo "  tinyllama     → 1.1B (637MB) - সবচেয়ে হালকা"
  echo "  phi3:mini     → 3.8B (2.3GB) - ভালো মানের ছোট মডেল"
  echo "  gemma3:1b     → 1B (815MB) - Google-এর হালকা মডেল"
  echo "  qwen2.5:1.5b  → 1.5B (986MB) - দ্রুত ও কার্যকর"
  echo "  llama3.2:1b   → 1B (1.3GB) - Meta-এর ছোট মডেল"
  echo "  deepseek-r1:1.5b → 1.5B (1.1GB) - রিজনিং মডেল"
  exit 1
fi
echo "📥 $1 মডেল ডাউনলোড করা হচ্ছে..."
proot-distro login ubuntu -- bash -c "ollama pull $1"
echo "✅ $1 মডেল ডাউনলোড সম্পন্ন!"
SCRIPT
chmod +x $PREFIX/bin/ollama-pull

# ollama-list: ইনস্টল করা মডেল দেখার স্ক্রিপ্ট
cat > $PREFIX/bin/ollama-list << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
echo "📋 ইনস্টল করা মডেলসমূহ:"
proot-distro login ubuntu -- bash -c "ollama list"
SCRIPT
chmod +x $PREFIX/bin/ollama-list

# ollama-api: API টেস্ট করার স্ক্রিপ্ট
cat > $PREFIX/bin/ollama-api << 'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash
MODEL=${1:-"tinyllama"}
PROMPT=${2:-"Hello, how are you?"}
echo "🔗 API দিয়ে $MODEL মডেলে প্রশ্ন পাঠানো হচ্ছে..."
curl -s http://localhost:11434/api/chat -d "{
  \"model\": \"$MODEL\",
  \"messages\": [{
    \"role\": \"user\",
    \"content\": \"$PROMPT\"
  }],
  \"stream\": false
}" | python -m json.tool 2>/dev/null || echo "❌ সার্ভার চালু আছে কিনা নিশ্চিত করুন (ollama-start)"
SCRIPT
chmod +x $PREFIX/bin/ollama-api

# --- Step 7: ডিফল্ট মডেল ডাউনলোড (tinyllama - অ্যান্ড্রয়েডের জন্য সবচেয়ে উপযুক্ত) ---
echo "[7/8] ডিফল্ট মডেল (tinyllama) ডাউনলোড করা হচ্ছে..."
proot-distro login ubuntu -- bash -c '
  ollama serve &
  sleep 5
  ollama pull tinyllama
  pkill -f "ollama serve" 2>/dev/null
'

# --- Step 8: Python SDK ইনস্টল ---
echo "[8/8] Python Ollama SDK ইনস্টল করা হচ্ছে..."
pip install ollama 2>/dev/null || pip3 install ollama 2>/dev/null || true

# --- সেটআপ সম্পন্ন ---
clear
echo "============================================="
echo "  ✅ Ollama AI Assistant সেটআপ সম্পন্ন!"
echo "============================================="
echo ""
echo "📌 ব্যবহারের কমান্ডসমূহ:"
echo "─────────────────────────────────────────────"
echo "  ollama-start        → সার্ভার চালু করুন"
echo "  ollama-stop         → সার্ভার বন্ধ করুন"
echo "  ollama-chat         → tinyllama দিয়ে চ্যাট"
echo "  ollama-chat phi3:mini → phi3 দিয়ে চ্যাট"
echo "  ollama-pull <model> → নতুন মডেল ডাউনলোড"
echo "  ollama-list         → মডেল তালিকা দেখুন"
echo "  ollama-api          → API টেস্ট করুন"
echo "─────────────────────────────────────────────"
echo ""
echo "🚀 শুরু করতে টাইপ করুন:"
echo "   ollama-start"
echo "   ollama-chat"
echo ""
echo "📱 অ্যান্ড্রয়েডের জন্য প্রস্তাবিত মডেল:"
echo "   tinyllama (637MB) - 2GB+ RAM ডিভাইসে চলবে"
echo "   gemma3:1b (815MB) - 3GB+ RAM ডিভাইসে চলবে"
echo "   phi3:mini (2.3GB) - 4GB+ RAM ডিভাইসে চলবে"
echo "============================================="
