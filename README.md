---
title: Founder AI
emoji: 🚀
colorFrom: blue
colorTo: indigo
sdk: gradio
app_file: app.py
python_version: "3.11"
license: mit
---

# Founder AI

A small open-source chat starter for founders: clarify ideas, plan validation,
and scope an MVP. Model inference runs through Hugging Face Inference Providers;
no model files are downloaded to your computer or to the Space.

This is the first milestone, not the complete agent platform. It does not yet
connect to external apps, execute code, deploy products, or persist projects.

## Setup

Deployment status: not deployed. On September 22, 2026, the owner's Space
creation screen required a paid plan for Gradio and Docker; only Static was
available free. This Python starter cannot run as a Static Space. A different
backend host is needed to continue with a zero-budget deployment. Never place
the owner's API token in static browser code.

Read START-HERE.md. Configure a Space secret named HF_TOKEN with permission to
call Inference Providers, plus a variable named MODEL_ID identifying a currently
provider-supported chat model. Check the model's own license separately; the MIT
license in this repository applies only to this application's code.

The API is metered separately from Space hosting. This demo allows 30 requests
across all users per process lifetime. Restarts reset that counter, and failed
requests count. This is a basic experiment limit, not a durable spending cap.
Do not enable paid usage without setting and understanding provider billing limits.

Messages are sent to Hugging Face and its selected inference provider. The app
does not deliberately write conversations to disk. Provider and hosting policies
still apply. The app has no per-user account system or durable rate limiting yet.

## Verification status

Python syntax and isolated response-handling checks were run during preparation.
Live model calls, UI startup, and cloud deployment remain to be tested after
account setup. Dependency ranges should be locked to the tested versions after
the first successful Space build.

## Official references

- https://huggingface.co/docs/hub/spaces-overview
- https://huggingface.co/docs/huggingface_hub/package_reference/inference_client
- https://huggingface.co/docs/inference-providers/pricing
- https://huggingface.co/docs/hub/spaces-github-actions
