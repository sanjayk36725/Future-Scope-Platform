# AI Services

This directory provides utility modules and core helper clients that connect our agents to LLM providers.

## Contents
- `geminiService.ts`: Standardized initialization of the `@google/genai` client, verifying correct environment variables and API keys without leaking secrets or blocking startup processes.
- **RAG & Memory Services**: Configurable document parsers and memory vectors to enrich agent contexts during interactive chats.
