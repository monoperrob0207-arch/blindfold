# 🚀 BLINDFOLD - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Requires Login)

```bash
cd blindfold
npx vercel --prod
```

### Option 2: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   cd blindfold
   git init
   git add .
   git commit -m "Initial commit: Blindfold Mission Control"
   gh repo create blindfold --public --source=. --push
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your blindfold repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Setup GitHub Actions (Optional)**
   - Go to Vercel Project Settings → Git → GitHub Actions
   - Enable automatic deployments
   - Add secrets:
     - `VERCEL_TOKEN` (from https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID` (from project settings)
     - `VERCEL_PROJECT_ID` (from project settings)

### Option 3: Manual Deploy

```bash
cd blindfold
npm run build
npx vercel --prod
```

## 🎨 Design Preview

### Theme: Onix with Neon Accents
- **Primary**: Neon Blue (`#00d4ff`)
- **Secondary**: Neon Red (`#ff3366`)
- **Background**: Onix Dark (`#0a0a0f`)

### Pages
1. **Dashboard**: Main overview with stats, agents, task board
2. **Task Board**: Kanban view with drag & drop
3. **Agents**: Detailed agent cards with stats
4. **Activity**: Real-time activity feed

### Components
- 🤖 `AgentCard` - Agent status and current task
- 📋 `TaskCard` - Task details with priority badges
- 📡 `ActivityItem` - Live activity updates
- 🔔 `NotificationPanel` - Real-time notifications

## 📁 Project Structure

```
blindfold/
├── .github/workflows/deploy.yml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AgentCard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   └── lib/
│       ├── types.ts
│       └── store.ts
├── vercel.json
├── package.json
└── deploy.sh
```

## 🛠️ Local Development

```bash
cd blindfold
npm install
npm run dev
# Open http://localhost:3000
```

## 🌐 Live Preview

After deployment, your Blindfold Mission Control will be available at:
```
https://blindfold.vercel.app
```

Or your custom domain configured in Vercel.

---

Built with ❤️ by Dr.IA
