"""Founder AI: a cloud chat prototype. No model weights are downloaded."""
import os
import threading

import gradio as gr
from huggingface_hub import InferenceClient

SYSTEM = """You are Founder AI, an assistant for entrepreneurship and product building.
Help founders clarify customers, test assumptions, scope MVPs, and plan execution.
Ask focused questions when context is missing. Distinguish evidence from guesses.
Never invent research, customer interviews, market numbers, or completed actions.
You have no connected tools, internet search, or execution environment in this
prototype. You can draft plans and code, but cannot deploy or automate apps yet.
Explain technical concepts simply and give concrete next steps.
"""
lock = threading.Lock()
requests_used = 0


def as_text(content):
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "\n".join(p.get("text", "") for p in content
                         if isinstance(p, dict) and p.get("type") == "text")
    return ""


def respond(message, history):
    global requests_used
    token = os.getenv("HF_TOKEN", "")
    model = os.getenv("MODEL_ID", "")
    if not token or not model:
        return "The owner needs to configure HF_TOKEN and MODEL_ID in Space Settings before chat can work."
    message = as_text(message).strip()
    if not message or len(message) > 6000:
        return "Please send a message between 1 and 6,000 characters."
    with lock:
        # Shared across all visitors, resets on server restart. Not a billing cap.
        if requests_used >= 30:
            return "This early demo has reached its shared usage limit. Please check back with the owner."
        requests_used += 1
    messages = [{"role": "system", "content": SYSTEM}]
    for item in history[-8:]:
        if item.get("role") in {"user", "assistant"}:
            text = as_text(item.get("content"))[:6000]
            if text:
                messages.append({"role": item["role"], "content": text})
    messages.append({"role": "user", "content": message})
    try:
        client = InferenceClient(provider="auto", api_key=token, timeout=60)
        response = client.chat_completion(model=model, messages=messages,
                                          max_tokens=700, temperature=0.6)
        return response.choices[0].message.content or "No answer was returned. Please try again."
    except Exception:
        # Do not expose provider responses, credentials, or internals to visitors.
        return "The model could not respond. The owner should check model provider availability, token permissions, and inference credits."


demo = gr.ChatInterface(
    fn=respond,
    title="Founder AI",
    description="Explore a business idea, define your MVP, and plan your next step. "
                "Early chat prototype: connected-app automation is not available yet. "
                "Messages are processed by Hugging Face and the selected model provider. "
                "Chat is not saved by this app and may disappear when you refresh.",
    examples=["Help me validate my startup idea. Ask me one question at a time.",
              "Help me turn my product idea into a small MVP.",
              "Help me plan a week of customer interviews."],
    cache_examples=False,
)

if __name__ == "__main__":
    demo.queue(max_size=8, default_concurrency_limit=1).launch()
