"""Example: Chat with Ollama using the Python SDK."""

try:
    from ollama import chat
except ImportError:
    print("Install the Ollama Python SDK first: pip install ollama")
    exit(1)

response = chat(
    model="gemma3",
    messages=[
        {
            "role": "user",
            "content": "Why is the sky blue?",
        },
    ],
)
print(response.message.content)
