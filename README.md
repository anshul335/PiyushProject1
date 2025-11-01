# 🧠 FocusFlow — Productivity Dashboard with Pomodoro Timer & Task Manager

FocusFlow is a modern productivity web app built with **React**, **FastAPI**, and **MongoDB Atlas**.  
It helps you manage your daily tasks, focus sessions, and track your progress using the Pomodoro technique — all in one sleek dashboard. 🚀

---

## ⚙️ Tech Stack

**Frontend:** React 18 + Vite, Tailwind CSS, shadcn/ui, Axios, Lucide Icons, Sonner (toasts)  
**Backend:** FastAPI, Python, Motor (MongoDB async driver), dotenv, CORS Middleware  
**Database:** MongoDB Atlas  

---

## 🚀 How to Run

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/anshul335/PiyushProject1.git
cd PiyushProject1
```

### 2. Setup Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # For Windows

or

source venv/bin/activate   # For Mac/Linux
pip install -r requirements.txt
uvicorn server:app --reload
```

Backend will start at 👉 http://localhost:8000

### 3. Setup Frontend (React+Vite)

```bash
cd frontend
npm install
npm run dev
```
Frontend will run at 👉 http://localhost:5173

### ✨ Features

- ✅ Task Manager: Add, complete, and delete tasks synced with MongoDB
- 🎯 Focus Timer: Pomodoro-based work/break sessions with automatic switching
- 📅 Daily Progress: Tracks completed sessions and task count
- 🌗 Dynamic Dashboard: Light/Dark mode, motivational quotes, and persistent settings

### Project Structure
```bash
├── .emergent
    ├── emergent.yml
    └── markers
    │   └── .bootstrap-complete
├── .gitignore
├── README.md
├── backend
    ├── .env
    ├── requirements.txt
    └── server.py
├── frontend
    ├── .env
    ├── .gitignore
    ├── README.md
    ├── craco.config.js
    ├── plugins
    │   ├── health-check
    │   │   ├── health-endpoints.js
    │   │   └── webpack-health-plugin.js
    │   └── visual-edits
    │   │   ├── babel-metadata-plugin.js
    │   │   └── dev-server-setup.js
    ├── postcss.config.js
    ├── public
    │   └── index.html
    ├── repomix-output.xml
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── components
    │   │   ├── BackgroundManager.jsx
    │   │   ├── DailyFocus.jsx
    │   │   ├── FocusTimer.jsx
    │   │   ├── QuickWidgets.jsx
    │   │   ├── QuoteCard.jsx
    │   │   ├── SettingsPanel.jsx
    │   │   ├── TaskManager.jsx
    │   │   └── ui
    │   │   │   ├── accordion.jsx
    │   │   │   ├── alert-dialog.jsx
    │   │   │   ├── alert.jsx
    │   │   │   ├── aspect-ratio.jsx
    │   │   │   ├── avatar.jsx
    │   │   │   ├── badge.jsx
    │   │   │   ├── breadcrumb.jsx
    │   │   │   ├── button.jsx
    │   │   │   ├── calendar.jsx
    │   │   │   ├── card.jsx
    │   │   │   ├── carousel.jsx
    │   │   │   ├── checkbox.jsx
    │   │   │   ├── collapsible.jsx
    │   │   │   ├── command.jsx
    │   │   │   ├── context-menu.jsx
    │   │   │   ├── dialog.jsx
    │   │   │   ├── drawer.jsx
    │   │   │   ├── dropdown-menu.jsx
    │   │   │   ├── form.jsx
    │   │   │   ├── hover-card.jsx
    │   │   │   ├── input-otp.jsx
    │   │   │   ├── input.jsx
    │   │   │   ├── label.jsx
    │   │   │   ├── menubar.jsx
    │   │   │   ├── navigation-menu.jsx
    │   │   │   ├── pagination.jsx
    │   │   │   ├── popover.jsx
    │   │   │   ├── progress.jsx
    │   │   │   ├── radio-group.jsx
    │   │   │   ├── resizable.jsx
    │   │   │   ├── scroll-area.jsx
    │   │   │   ├── select.jsx
    │   │   │   ├── separator.jsx
    │   │   │   ├── sheet.jsx
    │   │   │   ├── skeleton.jsx
    │   │   │   ├── slider.jsx
    │   │   │   ├── sonner.jsx
    │   │   │   ├── switch.jsx
    │   │   │   ├── table.jsx
    │   │   │   ├── tabs.jsx
    │   │   │   ├── textarea.jsx
    │   │   │   ├── toast.jsx
    │   │   │   ├── toaster.jsx
    │   │   │   ├── toggle-group.jsx
    │   │   │   ├── toggle.jsx
    │   │   │   └── tooltip.jsx
    │   ├── hooks
    │   │   └── use-toast.js
    │   ├── index.css
    │   ├── index.js
    │   ├── lib
    │   │   └── utils.js
    │   └── pages
    │   │   └── Dashboard.jsx
    └── tailwind.config.js
└── tests
    └── __init__.py
```

# Live link

### Backend (we are using free version of render of it is possible that sometimes it gives bad gateway or likewise errors, but after a few minutes it will again begin to accept the requests and becomes live)
```bash
https://mindful-dashboard.onrender.com/
```
### Frontend
```bash
https://shiny-lily-c1b101.netlify.app/
```

