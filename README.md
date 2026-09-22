---
title: VAPE.AI
emoji: 🚀
colorFrom: blue
colorTo: indigo
sdk: static
app_file: index.html
license: mit
---

# VAPE.AI

An open-source founder chat prototype for validating ideas, planning MVPs, and drafting product work.

- Interface: Hugging Face Static Space (`index.html`).
- Backend: Cloudflare Worker (`worker.mjs`) with a Workers AI binding named `AI`.
- Model: Qwen2.5-Coder-32B-Instruct, whose model weights carry Apache-2.0. Application code is MIT licensed. This is an existing model, not a newly trained model.
- No model downloads or API tokens in the browser.

## Current scope

Founder chat, image input, and optional web research. App connections, persistent projects, code execution, and deployment tools are not implemented. The assistant must not claim otherwise.

Messages are processed by Cloudflare Workers AI. Conversations remain in page memory and disappear on refresh. Hosting/provider logging policies still apply. The app does not log message bodies or write conversations to a database.

The free AI allocation is shared across visitors. Stay on Workers Free to avoid metered overage; requests fail after its allowance is exhausted. The per-IP five-request/minute guard is best-effort per Worker isolate, not durable global abuse protection. CORS is not authentication. Add durable quotas, user authentication, and appropriate account integrations before broader use.

## Deploy

Create a Cloudflare Worker and paste worker.mjs into its editor. Add a Workers AI binding named AI. For CLI deployment use wrangler.jsonc. Set the allowed frontend origin in worker.mjs, and the deployed Worker URL in index.html.

Create a public Hugging Face Static Space and upload index.html, this README.md, and LICENSE. Neither Space secrets nor browser code should contain owner API keys. Source is maintained on GitHub; uploads are currently manual.

The original app.py and requirements.txt are a legacy Gradio starter, not used by this deployment. Gradio Spaces required a paid plan on this account at setup.

## Model and hosting references

- https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct
- https://developers.cloudflare.com/workers-ai/models/qwen2.5-coder-32b-instruct/
- https://developers.cloudflare.com/workers-ai/platform/pricing/

## Research and images update

The interface now includes image selection and optional web research modes.
Images are resized in-browser and sent to Cloudflare's Qwen vision model for the current message only.
Image support must be verified against the active model before announcing availability.

Web search uses Tavily. Add TAVILY_API_KEY as a Cloudflare Worker secret (never in source).
Without that secret both research modes remain disabled. Basic mode makes one search;
deep mode makes three advanced searches, deduplicates sources, and synthesizes retrieved
excerpts. It is bounded research, not an exhaustive autonomous investigation. It does not
fetch arbitrary URLs or follow page instructions. Tavily and Cloudflare quotas both apply.

Google app integration is not implemented or active yet. The UI states setup pending.
Next requirements: choose the initial Google action, configure an OAuth client and consent
screen in the owner's Google Cloud project, and implement scoped authorization and an
exact action approval flow. Never use the owner's Google credentials for other visitors.

