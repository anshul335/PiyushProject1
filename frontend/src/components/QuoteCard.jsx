import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart } from 'lucide-react';
import { toast } from 'sonner';

const inspirationalQuotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
];

export const QuoteCard = () => {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites
    const saved = localStorage.getItem('favoriteQuotes');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }

    // Load or set daily quote
    const today = new Date().toDateString();
    const savedQuote = localStorage.getItem('dailyQuote');
    
    if (savedQuote) {
      const parsed = JSON.parse(savedQuote);
      if (parsed.date === today) {
        setQuote(parsed.quote);
        return;
      }
    }
    
    // Set new quote for today
    const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    setQuote(randomQuote);
    localStorage.setItem('dailyQuote', JSON.stringify({
      date: today,
      quote: randomQuote
    }));
  }, []);

  const refreshQuote = () => {
    const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    setQuote(randomQuote);
    
    const today = new Date().toDateString();
    localStorage.setItem('dailyQuote', JSON.stringify({
      date: today,
      quote: randomQuote
    }));
  };

  const toggleFavorite = () => {
    if (!quote) return;
    
    const isFavorite = favorites.some(fav => fav.text === quote.text);
    
    if (isFavorite) {
      const updated = favorites.filter(fav => fav.text !== quote.text);
      setFavorites(updated);
      localStorage.setItem('favoriteQuotes', JSON.stringify(updated));
      toast.success('Removed from favorites');
    } else {
      const updated = [...favorites, quote];
      setFavorites(updated);
      localStorage.setItem('favoriteQuotes', JSON.stringify(updated));
      toast.success('Added to favorites');
    }
  };

  const isFavorite = quote && favorites.some(fav => fav.text === quote.text);

  if (!quote) return null;

  return (
    <Card className="glass p-6 border-0 shadow-medium animate-slide-in">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">Daily Inspiration</h3>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleFavorite}
            className={`h-8 w-8 rounded-full transition-smooth ${
              isFavorite 
                ? 'text-accent hover:bg-accent/20' 
                : 'hover:bg-primary/10'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={refreshQuote}
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-smooth"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <blockquote className="space-y-3">
        <p className="text-base leading-relaxed italic text-foreground/90">
          "{quote.text}"
        </p>
        <footer className="text-sm text-muted-foreground">
          — {quote.author}
        </footer>
      </blockquote>
    </Card>
  );
};