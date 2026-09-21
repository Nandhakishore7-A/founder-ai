# From zero to your first Founder AI demo

You already have GitHub. Your next step is creating a Hugging Face account.
We will work through the following steps together; you do not have to complete
this entire guide at once. No model download or local software installation is needed.

## 1. Create your Hugging Face account

Open https://huggingface.co/join, create your account, and verify your email.
Keep passwords and access tokens private. Share only your username or public links.

## 2. Put the code on GitHub

Create a new public repository at https://github.com/new named founder-ai
(or choose your own name). Upload the contents of this folder at the repository
root: app.py, requirements.txt, README.md, LICENSE, and START-HERE.md.
Use GitHub's Add file / Upload files control and commit the upload.
This is your editable, open-source project. GitHub stores the code; it does not
run this Python app through GitHub Pages.

## 3. Create a Hugging Face Space

On September 22, 2026, this account's creation screen at
https://huggingface.co/new-space required a paid plan for Gradio and Docker.
Only Static Spaces were available free. Do not subscribe to continue this guide
unless you deliberately choose a paid route. The Python app cannot run as Static.
The zero-budget route needs a different backend host and a revised deployment.
Do not expose your API token in a Static Space to work around the restriction.

If you later choose a Gradio-capable plan, create a Gradio Space and upload the
files at its root. Model inference remains separately metered. A public Space
exposes both the source and demo; the chat needs the configuration below.

## 4. Connect the hosted model

We will choose the model together based on current provider availability,
license, and cost. An open model is not necessarily available through a hosted API.

In Hugging Face account Settings / Access Tokens, create a fine-grained token
with permission to make calls to Inference Providers. In the Space Settings,
add it as a SECRET named HF_TOKEN. Do not put it in any code file or chat message.
Add a VARIABLE named MODEL_ID containing the selected model repository ID.
The token must belong to the account whose inference allowance you intend to use.

Free hosting does not provide unlimited model calls. Check current allowances at
https://huggingface.co/docs/inference-providers/pricing before testing.
If no suitable free allowance is available, pause at the working interface rather
than adding paid credits unknowingly. Restart the Space after configuration if needed.

## 5. Test before inviting people

Ask it to help define a target customer and MVP. Check that a second message
uses the first message's context. Open a separate browser session and confirm
it does not show the first conversation. Test unavailable-model behavior and
the shared demo limit. It must never claim to have performed an external action.

## 6. Keep deployments simple initially

For the first build, upload updates to both repositories. Once the demo works,
we can connect GitHub Actions using Hugging Face's documented sync action:
https://huggingface.co/docs/hub/spaces-github-actions

That later step needs a separate appropriately scoped deployment token, saved
as a GitHub secret. GitHub becomes the source of truth; syncing can replace or
delete Space files, so stop editing the Space directly once syncing is enabled.

## 7. Add actual automation

After chat works, add one authenticated app integration. GitHub issue creation
is a relevant first workflow: turn an approved MVP task into an issue. Each user
must connect their own account; never share the owner's credentials with visitors.
Add an exact-action preview, approval, result verification, and activity history.

Before a wider public launch, add durable user accounts, quotas, secure token
storage, and abuse controls. Code execution needs an isolated environment.
These are later milestones, not features included in this starter.
