"""
Termux-এ Ollama Python SDK দিয়ে চ্যাট করার উদাহরণ।
ব্যবহার: python examples/termux_chat.py
"""

import sys

try:
    from ollama import chat
except ImportError:
    print("Ollama SDK ইনস্টল করুন: pip install ollama")
    sys.exit(1)

MODEL = "tinyllama"

print(f"🤖 {MODEL} মডেলের সাথে চ্যাট (বের হতে 'exit' লিখুন)")
print("─" * 40)

while True:
    try:
        user_input = input("\n👤 আপনি: ")
        if user_input.lower() in ("exit", "quit", "বের"):
            print("👋 বিদায়!")
            break

        response = chat(
            model=MODEL,
            messages=[{"role": "user", "content": user_input}],
        )
        print(f"\n🤖 AI: {response.message.content}")
    except KeyboardInterrupt:
        print("\n👋 বিদায়!")
        break
    except Exception as e:
        print(f"❌ ত্রুটি: {e}")
        print("ollama-start দিয়ে সার্ভার চালু আছে কিনা নিশ্চিত করুন।")
