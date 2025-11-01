import React, { useState, useEffect } from 'react';
import { BackgroundManager } from '@/components/BackgroundManager';
import { DailyFocus } from '@/components/DailyFocus';
import { FocusTimer } from '@/components/FocusTimer';
import { TaskManager } from '@/components/TaskManager';
import { QuoteCard } from '@/components/QuoteCard';
import { QuickWidgets } from '@/components/QuickWidgets';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Button } from '@/components/ui/button';
import { Settings, Moon, Sun } from 'lucide-react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export default function Dashboard() {
  // 🌗 Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(() => localStorage.getItem('backgroundImage') || '');

  // ✅ Task State (Shared between TaskManager & FocusTimer)
  const [tasks, setTasks] = useState([]);

  // 🧠 Fetch tasks once from MongoDB (on load)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/status`);
        const mongoTasks = res.data.map((t) => ({
          id: t.id,
          text: t.client_name,
          completed: t.completed || false,
          createdAt: t.timestamp,
        }));
        setTasks(mongoTasks);
        console.log('✅ Loaded tasks from MongoDB:', mongoTasks);
      } catch (err) {
        console.error('❌ Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  // 🌗 Theme Effect
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 🌗 Theme Toggle
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 🌄 Background */}
      <BackgroundManager
        backgroundImage={backgroundImage}
        setBackgroundImage={setBackgroundImage}
      />

      {/* 🌫 Content Layer */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* 🧭 Top Bar */}
        <div className="flex justify-end items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="glass rounded-full h-10 w-10 hover:shadow-medium transition-smooth"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="glass rounded-full h-10 w-10 hover:shadow-medium transition-smooth"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* 🧩 Main Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ⏱ Left Column — Focus + Timer */}
          <div className="lg:col-span-2 space-y-6">
            <DailyFocus />
            <FocusTimer tasks={tasks} /> {/* 👈 Send tasks to FocusTimer */}
          </div>

          {/* ✅ Right Column — Tasks + Quote + Widgets */}
          <div className="space-y-6">
            <TaskManager tasks={tasks} setTasks={setTasks} /> {/* 👈 Pass task state here */}
            <QuoteCard />
            <QuickWidgets />
          </div>
        </div>
      </div>

      {/* ⚙️ Settings Panel */}
      {showSettings && (
        <SettingsPanel
          onClose={() => setShowSettings(false)}
          theme={theme}
          setTheme={setTheme}
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
        />
      )}
    </div>
  );
}
