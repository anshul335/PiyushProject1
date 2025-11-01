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

git clone https://github.com/anshul335/PiyushProject1.git
cd focusflow

### 2. Setup Backend (FastAPI)
- cd backend
- python -m venv venv
- venv\Scripts\activate      # For Windows

or

- source venv/bin/activate   # For Mac/Linux
- pip install -r requirements.txt
- uvicorn server:app --reload

Backend will start at 👉 http://localhost:8000

### 3. Setup Frontend (React+Vite)
- cd frontend
- npm install
- npm run dev

Frontend will run at 👉 http://localhost:5173

### ✨ Features

- ✅ Task Manager: Add, complete, and delete tasks synced with MongoDB
- 🎯 Focus Timer: Pomodoro-based work/break sessions with automatic switching
- 📅 Daily Progress: Tracks completed sessions and task count
- 🌗 Dynamic Dashboard: Light/Dark mode, motivational quotes, and persistent settings

### Project Structure

📦 focusflow/
 ┣ 📂 frontend/
 ┃ ┣ 📂 src/components/
 ┃ ┃ ┣ BackgroundManager.jsx
 ┃ ┃ ┣ FocusTimer.jsx
 ┃ ┃ ┣ TaskManager.jsx
 ┃ ┃ ┣ DailyFocus.jsx
 ┃ ┃ ┣ QuoteCard.jsx
 ┃ ┃ ┗ QuickWidgets.jsx
 ┃ ┣ Dashboard.jsx
 ┃ ┣ main.jsx
 ┃ ┣ index.css
 ┃ ┗ .env
 ┣ 📂 backend/
 ┃ ┣ server.py
 ┃ ┗ .env
 ┣ package.json
 ┣ requirements.txt
 ┗ README.md
