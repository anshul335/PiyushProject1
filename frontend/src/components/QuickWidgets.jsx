import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cloud, MapPin, Link as LinkIcon, Plus, ExternalLink, X } from 'lucide-react';
import { toast } from 'sonner';

export const QuickWidgets = () => {
  const [weather, setWeather] = useState(null);
  const [quickLinks, setQuickLinks] = useState([]);
  const [showAddLink, setShowAddLink] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  useEffect(() => {
    // Load quick links
    const saved = localStorage.getItem('quickLinks');
    if (saved) {
      setQuickLinks(JSON.parse(saved));
    } else {
      // Default links
      const defaultLinks = [
        { id: 1, title: 'Gmail', url: 'https://mail.google.com' },
        { id: 2, title: 'Calendar', url: 'https://calendar.google.com' },
        { id: 3, title: 'Drive', url: 'https://drive.google.com' },
      ];
      setQuickLinks(defaultLinks);
      localStorage.setItem('quickLinks', JSON.stringify(defaultLinks));
    }

    // Mock weather data (in real app, would fetch from API)
    setWeather({
      temp: 28,
      condition: 'Sunny',
      location: 'LNMIIT'
    });
  }, []);

  const addQuickLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      const link = {
        id: Date.now(),
        title: newLink.title.trim(),
        url: newLink.url.trim(),
      };
      const updated = [...quickLinks, link];
      setQuickLinks(updated);
      localStorage.setItem('quickLinks', JSON.stringify(updated));
      setNewLink({ title: '', url: '' });
      setShowAddLink(false);
      toast.success('Link added!');
    }
  };

  const removeLink = (id) => {
    const updated = quickLinks.filter(link => link.id !== id);
    setQuickLinks(updated);
    localStorage.setItem('quickLinks', JSON.stringify(updated));
    toast.success('Link removed');
  };

  return (
    <Card className="glass p-6 border-0 shadow-medium animate-slide-in">
      {/* Weather Widget */}
      {weather && (
        <div className="mb-6 pb-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Cloud className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-semibold">{weather.temp}°C</p>
              <p className="text-sm text-muted-foreground">{weather.condition}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{weather.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Quick Links
          </h3>
          {!showAddLink && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowAddLink(true)}
              className="h-7 w-7 rounded-full hover:bg-primary/10 transition-smooth"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Add Link Form */}
        {showAddLink && (
          <div className="mb-3 p-3 rounded-lg bg-background/30 space-y-2 animate-slide-in">
            <Input
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              placeholder="Link title"
              className="text-sm bg-background/50 border-border/50"
            />
            <Input
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="URL (https://...)"
              className="text-sm bg-background/50 border-border/50"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={addQuickLink}
                className="flex-1 bg-primary hover:bg-primary-dark transition-smooth"
              >
                Add
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowAddLink(false);
                  setNewLink({ title: '', url: '' });
                }}
                className="border-border/50 transition-smooth"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Links List */}
        <div className="space-y-1">
          {quickLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/30 transition-smooth group"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center gap-2 text-sm hover:text-primary transition-smooth"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                <span className="truncate">{link.title}</span>
              </a>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeLink(link.id)}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};