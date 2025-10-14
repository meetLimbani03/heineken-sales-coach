<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1NOxEadjygIFK21ZeBgMcFzGS9e4oCmdg

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install` or `pnpm install`
2. Set the following environment variables in [.env](.env) or your deployment environment:
   - `AZURE_OPENAI_API_KEY` - Your Azure OpenAI API key
   - `AZURE_OPENAI_ENDPOINT` - Your Azure OpenAI endpoint URL
   - `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` - The name of your deployed chat model
   - `AZURE_OPENAI_API_VERSION` - The API version (default: "2024-08-01-preview")
3. Run the app:
   `npm run dev` or `pnpm dev`
