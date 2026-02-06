# Blindfold - Mission Control Panel

🎯 **Multi-Agent Orchestration System**

A beautiful, responsive dashboard for managing AI agents with real-time updates, task tracking, and activity monitoring.

![Blindfold Preview](https://via.placeholder.com/800x400/0a0a0f/00d4ff?text=Blindfold+Mission+Control)

## ✨ Features

- 🤖 **4 Specialized Agents**: Viper, Sentinel, Oracle, Navigator
- 📋 **Kanban Task Board**: Drag & drop task management
- 📡 **Real-time Activity Feed**: Live updates from all agents
- 🔔 **Notifications System**: Never miss important updates
- 📊 **Analytics Dashboard**: Track performance and progress
- 🌙 **Dark Mode**: Onix theme with neon accents
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors
- **Primary**: Neon Blue (`#00d4ff`)
- **Secondary**: Neon Red (`#ff3366`)
- **Background**: Onix (`#0a0a0f`)
- **Accent**: Neon White (`#ffffff`)

### Animations
- Smooth transitions with Framer Motion
- Floating elements for depth
- Slide-in notifications
- Pulse effects for active agents

## 📦 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## 🤖 Agents

| Agent | Role | Status |
|-------|------|--------|
| 🐍 Viper | Senior Developer | Active |
| 🛡️ Sentinel | Security Expert | Active |
| 🔮 Oracle | Research Analyst | Idle |
| 🧭 Navigator | Data Scientist | Sleeping |

## 📁 Project Structure

```
blindfold/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AgentCard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskColumn.tsx
│   │   ├── ActivityItem.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── MainContent.tsx
│   │   ├── NotificationPanel.tsx
│   │   └── Sidebar.tsx
│   └── lib/
│       ├── types.ts
│       └── store.ts
├── public/
├── package.json
├── tailwind.config.js
└── vercel.json
```

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_URL=your-api-url
```

## 📄 License

MIT License - feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by Dr.IA
