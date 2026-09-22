# VAPE.AI owner guide

The live version uses index.html on Hugging Face and worker.mjs on Cloudflare.
GitHub stores both source files. The Python files are the earlier unused starter.

1. Edit interface wording or appearance in index.html.
2. Upload changed interface files to the Hugging Face Space and GitHub.
3. Edit backend behavior in worker.mjs, then deploy through Cloudflare's editor.
4. Keep the Cloudflare Workers AI binding named AI and stay on the Free plan.
5. Test one conversation and a follow-up after each deployment.

Free usage is shared; an exhausted quota is not a reason to enable payment.
No automatic GitHub deployment has been configured yet.

Do not paste private credentials into public source. This prototype is chat only:
actual app automation requires a separate authenticated integration per user,
an action preview, approval, and verified results. It has no saved accounts or projects.
