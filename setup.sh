#!/bin/bash
set -e

echo "=== Ollama AI Assistant Setup ==="

# Detect OS and install Ollama
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Installing Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "On Windows, please run: irm https://ollama.com/install.ps1 | iex"
    echo "Or download from: https://ollama.com/download/OllamaSetup.exe"
    exit 1
else
    echo "Unsupported OS: $OSTYPE"
    exit 1
fi

# Start Ollama service
echo "Starting Ollama service..."
ollama serve &
sleep 5

# Pull a default model (gemma3 as recommended in the docs)
echo "Pulling default model (gemma3)..."
ollama pull gemma3

echo ""
echo "=== Setup Complete ==="
echo "Run 'ollama run gemma3' to start chatting."
echo "Run 'ollama launch openclaw' to use the AI assistant on messaging platforms."
echo "See README.md for more details."
