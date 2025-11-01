import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const TIMER_PRESETS = {
  pomodoro: { work: 25, break: 5, label: 'Pomodoro' },
  deep: { work: 45, break: 15, label: 'Deep Work' },
  short: { work: 15, break: 3, label: 'Quick Focus' },
};

export const FocusTimer = ({ tasks = [] }) => {
  const [preset, setPreset] = useState('pomodoro');
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [timeLeft, setTimeLeft] = useState(TIMER_PRESETS.pomodoro.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef(null);

  // 🧠 Task completion tracking
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  // 🎯 Load today's session count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('focusSessions');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      if (data.date === today) {
        setSessionsCompleted(data.count || 0);
      } else {
        // reset if a new day
        localStorage.setItem(
          'focusSessions',
          JSON.stringify({ date: today, count: 0 })
        );
        setSessionsCompleted(0);
      }
    }
  }, []);

  // ✅ Keep sessions count synced to localStorage whenever it changes
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(
      'focusSessions',
      JSON.stringify({ date: today, count: sessionsCompleted })
    );
  }, [sessionsCompleted]);

  // ⏱ Timer effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // 🧩 Handle completion of focus/break
  const handleTimerComplete = () => {
  setIsRunning(false);

  if (mode === 'work') {
    setSessionsCompleted((prevCount) => {
      const newCount = prevCount + 1;
      const today = new Date().toDateString();

      // ✅ Always save the latest value in localStorage
      localStorage.setItem(
        'focusSessions',
        JSON.stringify({ date: today, count: newCount })
      );

      toast.success('🎉 Focus session complete!', {
        description: `You've completed ${newCount} session${
          newCount > 1 ? 's' : ''
        } today.`,
      });

      return newCount;
    });

    // Switch to break mode
    setMode('break');
    setTimeLeft(TIMER_PRESETS[preset].break * 60);
  } else {
    toast.success('☕ Break complete! Time to focus again!');
    setMode('work');
    setTimeLeft(TIMER_PRESETS[preset].work * 60);
  }
};


  // 🧭 Preset change
  const handlePresetChange = (newPreset) => {
    setPreset(newPreset);
    setMode('work');
    setTimeLeft(TIMER_PRESETS[newPreset].work * 60);
    setIsRunning(false);
  };

  const handlePlayPause = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(TIMER_PRESETS[preset].work * 60);
  };

  // ⏳ Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // 🎨 Circular progress bar
  const progress =
    mode === 'work'
      ? (1 - timeLeft / (TIMER_PRESETS[preset].work * 60)) * 100
      : (1 - timeLeft / (TIMER_PRESETS[preset].break * 60)) * 100;

  return (
    <Card className="glass p-6 md:p-8 border-0 shadow-medium animate-slide-in">
      {/* Timer Preset Tabs */}
      <Tabs value={preset} onValueChange={handlePresetChange} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 bg-background/50">
          {Object.entries(TIMER_PRESETS).map(([key, value]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
            >
              {value.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Timer Display */}
      <div className="flex flex-col items-center space-y-6">
        {/* Circular Progress */}
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className={mode === 'work' ? 'text-primary' : 'text-secondary'}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-6xl font-bold font-mono tabular-nums">
              {formatTime(timeLeft)}
            </p>
            <p className="text-sm md:text-base text-muted-foreground mt-2 capitalize">
              {mode === 'work' ? '🎯 Focus Time' : '☕ Break Time'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="h-12 w-12 rounded-full border-border/50 hover:border-primary/50 transition-smooth"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <Button
            size="lg"
            onClick={handlePlayPause}
            className="h-16 w-16 rounded-full bg-primary hover:bg-primary-dark shadow-glow transition-smooth"
          >
            {isRunning ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 ml-1" />
            )}
          </Button>
        </div>

        {/* Session + Task Stats */}
        <div className="pt-4 border-t border-border/50 w-full space-y-2">
          {/* Focus sessions */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <p className="text-sm">
              {sessionsCompleted} focus session
              {sessionsCompleted !== 1 ? 's' : ''} today
            </p>
          </div>

          {/* Task progress */}
          {totalTasks > 0 && (
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-sm font-medium">
                {completedCount} / {totalTasks} tasks completed
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
