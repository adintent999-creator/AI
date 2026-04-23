#!/data/data/com.termux/files/usr/bin/bash
# Ollama REST API টেস্ট স্ক্রিপ্ট

echo "🔗 Ollama API টেস্ট করা হচ্ছে..."
echo ""

# সার্ভার চেক
echo "1️⃣ সার্ভার স্ট্যাটাস চেক:"
curl -s http://localhost:11434/ && echo " ✅ সার্ভার চালু আছে" || echo " ❌ সার্ভার বন্ধ আছে (ollama-start চালান)"
echo ""

# মডেল তালিকা
echo "2️⃣ ইনস্টল করা মডেল:"
curl -s http://localhost:11434/api/tags | python -m json.tool 2>/dev/null || echo "❌ সার্ভার চালু নেই"
echo ""

# চ্যাট টেস্ট
echo "3️⃣ চ্যাট টেস্ট (tinyllama):"
curl -s http://localhost:11434/api/chat -d '{
  "model": "tinyllama",
  "messages": [{"role": "user", "content": "Say hello in one sentence."}],
  "stream": false
}' | python -m json.tool 2>/dev/null || echo "❌ টেস্ট ব্যর্থ"

echo ""
echo "✅ API টেস্ট সম্পন্ন!"
