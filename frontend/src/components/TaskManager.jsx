import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const TaskManager = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);

  // ✅ Fetch tasks from MongoDB Atlas on first load
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
        console.log('✅ Tasks loaded from MongoDB:', mongoTasks);
      } catch (err) {
        console.error('❌ Error fetching tasks:', err);
        toast.error('Failed to load tasks from server');
      }
    };
    fetchTasks();
  }, [setTasks]);

  // 🟢 Add new task — store real MongoDB ID
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      // Send to backend first
      const res = await axios.post(`${API_BASE}/api/status`, {
        client_name: newTask.trim(),
      });

      // Backend returns created task with UUID
      const createdTask = {
        id: res.data.id,
        text: res.data.client_name,
        completed: false,
        createdAt: res.data.timestamp,
      };

      setTasks((prev) => [...prev, createdTask]);
      setNewTask('');
      setShowInput(false);
      toast.success('✅ Task added successfully!');
    } catch (error) {
      console.error('❌ Error saving task to MongoDB:', error);
      toast.error('Failed to sync with server');
    }
  };

  // 🟠 Toggle task completion (frontend only for now)
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 🔴 Delete task (MongoDB + frontend)
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/status/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success('🗑️ Task deleted');
      console.log('✅ Deleted from MongoDB:', id);
    } catch (error) {
      console.error('❌ Error deleting task from MongoDB:', error);
      toast.error('Failed to delete task from server');
    }
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <Card className="glass p-6 border-0 shadow-medium animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {incompleteTasks.length} active
          </p>
        </div>

        {!showInput && (
          <Button
            size="icon"
            onClick={() => setShowInput(true)}
            className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-smooth"
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Add Task Input */}
      {showInput && (
        <div className="mb-4 flex gap-2 animate-slide-in">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="bg-background/50 border-border/50 focus:border-primary transition-smooth"
            autoFocus
          />
          <Button
            size="icon"
            onClick={addTask}
            className="shrink-0 bg-primary hover:bg-primary-dark transition-smooth"
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setShowInput(false);
              setNewTask('');
            }}
            className="shrink-0 hover:bg-destructive/10 transition-smooth"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto hide-scrollbar">
        {/* Incomplete Tasks */}
        {incompleteTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-smooth group"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <p className="flex-1 text-sm leading-relaxed">
              {task.text}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => deleteTask(task.id)}
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="pt-2 mt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2 px-1">Completed</p>
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-background/20 hover:bg-background/30 transition-smooth group"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <p className="flex-1 text-sm leading-relaxed line-through text-muted-foreground">
                  {task.text}
                </p>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteTask(task.id)}
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No tasks yet. Click + to add one.</p>
          </div>
        )}
      </div>
    </Card>
  );
};
