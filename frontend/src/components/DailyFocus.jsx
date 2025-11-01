import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit3, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subDays, addDays } from 'date-fns';

export const DailyFocus = () => {
  const [date, setDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [dailyIntention, setDailyIntention] = useState('');
  const [savedIntentions, setSavedIntentions] = useState({});

  const dateKey = format(date, 'yyyy-MM-dd');
  const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    // Load saved intentions from localStorage
    const saved = localStorage.getItem('dailyIntentions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedIntentions(parsed);
      setDailyIntention(parsed[dateKey] || '');
    }
  }, [dateKey]);

  const handleSave = () => {
    const updated = {
      ...savedIntentions,
      [dateKey]: dailyIntention
    };
    setSavedIntentions(updated);
    localStorage.setItem('dailyIntentions', JSON.stringify(updated));
    setIsEditing(false);
  };

  const handlePrevDay = () => {
    setDate(prev => subDays(prev, 1));
    setIsEditing(false);
  };

  const handleNextDay = () => {
    if (!isToday) {
      setDate(prev => addDays(prev, 1));
      setIsEditing(false);
    }
  };

  const goToToday = () => {
    setDate(new Date());
    setIsEditing(false);
  };

  return (
    <Card className="glass p-6 md:p-8 border-0 shadow-medium animate-slide-in">
      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevDay}
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-smooth"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-center min-w-[140px]">
            <p className="text-sm text-muted-foreground">
              {format(date, 'EEEE')}
            </p>
            <p className="text-base font-medium">
              {format(date, 'MMMM d, yyyy')}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextDay}
            disabled={isToday}
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-smooth disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {!isToday && (
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-xs bg-primary/5 hover:bg-primary/10 border-primary/20 transition-smooth"
          >
            Today
          </Button>
        )}
      </div>

      {/* Daily Intention */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Today's Focus
          </h2>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-9 w-9 rounded-full hover:bg-primary/10 transition-smooth"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 transition-smooth"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isEditing ? (
          <Textarea
            value={dailyIntention}
            onChange={(e) => setDailyIntention(e.target.value)}
            placeholder="What's your one priority for today?"
            className="text-lg md:text-xl min-h-[120px] resize-none bg-background/50 border-border/50 focus:border-primary transition-smooth"
            autoFocus
          />
        ) : (
          <div className="min-h-[120px] flex items-center">
            {dailyIntention ? (
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                {dailyIntention}
              </p>
            ) : (
              <p className="text-lg md:text-xl text-muted-foreground italic">
                Click the edit button to set your daily intention...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Motivational Tag */}
      {isToday && dailyIntention && (
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center italic">
            "Focus on progress, not perfection."
          </p>
        </div>
      )}
    </Card>
  );
};