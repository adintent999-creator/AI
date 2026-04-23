<div align="center">
  <a href="https://ollama.com">
    <img alt="ollama" height="200px" src="https://github.com/ollama/ollama/assets/3325447/0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7">
  </a>
</div>

# Ollama

Get up and running with large language models locally.

## Download

- [Download for macOS](https://ollama.com/download/Ollama.dmg)
- [Download for Windows](https://ollama.com/download/OllamaSetup.exe)
- Install on Linux:
  ```sh
  curl -fsSL https://ollama.com/install.sh | sh
  ```
- [Docker image](https://hub.docker.com/r/ollama/ollama):
  ```sh
  docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
  ```

## Getting started

### Run a model

After installing, run a model from the command line:

```sh
ollama run gemma3
```

Ollama supports a [library of models](https://ollama.com/library) including `gemma3`, `qwen3`, `llama3.2`, `deepseek-r1`, `phi4`, and many more.

### Coding integrations

Use Ollama with your favorite editor:

- [Continue](https://www.continue.dev/) — VS Code and JetBrains extension for code completion and chat
- [Zed](https://zed.dev/) — high-performance, multiplayer code editor with native Ollama support
- [Cursor](https://www.cursor.com/) — AI-first code editor

### AI assistant via OpenClaw

Launch the OpenClaw assistant to use Ollama on messaging platforms:

```sh
ollama launch openclaw
```

## REST API

Ollama exposes a REST API on `http://localhost:11434`.

### Generate a response

```sh
curl http://localhost:11434/api/generate -d '{
  "model": "gemma3",
  "prompt": "Why is the sky blue?"
}'
```

### Chat with a model

```sh
curl http://localhost:11434/api/chat -d '{
  "model": "gemma3",
  "messages": [
    { "role": "user", "content": "why is the sky blue?" }
  ]
}'
```

See the [API documentation](https://github.com/ollama/ollama/blob/main/docs/api.md) for all endpoints.

## SDKs

### Python

```sh
pip install ollama
```

```python
from ollama import chat

response = chat(
    model="gemma3",
    messages=[{"role": "user", "content": "Why is the sky blue?"}],
)
print(response.message.content)
```

See [`examples/chat.py`](examples/chat.py).

### JavaScript

```sh
npm install ollama
```

```javascript
import ollama from "ollama";

const response = await ollama.chat({
  model: "gemma3",
  messages: [{ role: "user", content: "Why is the sky blue?" }],
});
console.log(response.message.content);
```

See [`examples/chat.mjs`](examples/chat.mjs).

## Community integrations

### Web & desktop chat interfaces

- [Open WebUI](https://github.com/open-webui/open-webui)
- [Enchanted (macOS)](https://github.com/AugustDev/enchanted)
- [LibreChat](https://github.com/danny-avila/LibreChat)
- [HTML UI](https://github.com/rtcfirefly/ollama-ui)
- [Hollama](https://github.com/fmaclen/hollama)
- [big-AGI](https://github.com/enricoros/big-AGI)
- [Chatbox](https://github.com/Bin-Huang/chatbox)
- [Lobe Chat](https://github.com/lobehub/lobe-chat)
- [Msty](https://msty.app)

### Code editors & coding tools

- [Continue](https://github.com/continuedev/continue)
- [Aider](https://github.com/paul-gauthier/aider)
- [llama.vim](https://github.com/ggml-org/llama.vim)
- [Ollama Copilot](https://github.com/bernardo-bruning/ollama-copilot)
- [twinny](https://github.com/twinnydotdev/twinny) (VS Code)

### Libraries

- [LangChain](https://python.langchain.com/docs/integrations/llms/ollama) and [LangChain.js](https://js.langchain.com/docs/integrations/chat/ollama)
- [LlamaIndex](https://docs.llamaindex.ai/en/stable/examples/llm/ollama/)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Haystack](https://haystack.deepset.ai/integrations/ollama)
- [Semantic Kernel](https://github.com/microsoft/semantic-kernel)
- [Spring AI](https://github.com/spring-projects/spring-ai)

### Frameworks

- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Langflow](https://github.com/logspace-ai/langflow)
- [Dify](https://github.com/langgenius/dify)
- [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm)

### RAG tools

- [PrivateGPT](https://github.com/imartinez/privateGPT)
- [Kotaemon](https://github.com/Cinnamon/kotaemon)
- [RAGFlow](https://github.com/infiniflow/ragflow)
- [Verba](https://github.com/weaviate/Verba)

### Bots

- [Discord AI Bot](https://github.com/mekb-turtle/discord-ai-bot)
- [Ollama Telegram Bot](https://github.com/ruecat/ollama-telegram)
- [Slack bot](https://github.com/sheshbabu/Chica-Slack-Bot)

### CLI tools

- [oterm](https://github.com/ggozad/oterm)
- [Ellama](https://github.com/s-kostyaev/ellama) (Emacs)
- [tlm](https://github.com/yusufcanb/tlm)
- [gptel](https://github.com/karthink/gptel) (Emacs)

## Documentation

- [Ollama docs](https://github.com/ollama/ollama/tree/main/docs)
- [REST API](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Modelfile reference](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
- [OpenAI compatibility](https://github.com/ollama/ollama/blob/main/docs/openai.md)
- [Troubleshooting](https://github.com/ollama/ollama/blob/main/docs/troubleshooting.md)

## This repository

This repo provides a minimal quickstart bundle around Ollama:

- [`setup.sh`](setup.sh) — one-shot install + pull a default model
- [`docker-compose.yml`](docker-compose.yml) — containerized deployment
- [`examples/`](examples) — Python and JavaScript chat examples
- [`requirements.txt`](requirements.txt) — Python SDK dependency
