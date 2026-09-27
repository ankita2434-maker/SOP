# SOP Builder - HR & Operations Standard Operating Procedure Generator

A lightweight, portable web application built for HR and Operations teams to turn messy operational notes, Slack logs, audio transcripts, and meeting minutes into auditable, standardized SOPs.

## Deploying to Netlify (Non-Developer Step-by-Step Guide)

### Step 1: Push to GitHub or GitLab
1. Unzip this package.
2. Initialize git in the folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for SOP Builder"
   ```
3. Create a new repository on [GitHub](https://github.com/new) and push the code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sop-builder.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to Netlify
1. Log in to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Choose **GitHub** and select your `sop-builder` repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

### Step 3: Add Environment Variables in Netlify (CRITICAL)
Before clicking Deploy, click **"Add environment variables"** (or go to **Site configuration > Environment variables** after creation):

1. **`GEMINI_API_KEY`**:
   - Go to [Google AI Studio API Keys](https://aistudio.google.com/app/apikey)
   - Click "Create API Key", copy it, and paste it as the value for `GEMINI_API_KEY`.
2. **`SOP_PASSCODE`**:
   - Set any team passcode of your choice, e.g. `ops-auth-8492-team` or `acme-hr-sop-2025`.

### Step 4: Deploy Site
- Click **"Deploy sop-builder"**.
- In 1-2 minutes, your live site will be ready at your Netlify URL (e.g., `https://sop-builder-acme.netlify.app`).
