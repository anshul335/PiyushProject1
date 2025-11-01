import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Image, Palette, Settings, Download } from 'lucide-react';
import { toast } from 'sonner';

const backgroundPresets = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', name: 'Mountain Vista' },
  { id: 2, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80', name: 'Forest Path' },
  { id: 3, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80', name: 'Misty Mountains' },
  { id: 4, url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=80', name: 'Flower Field' },
  { id: 5, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80', name: 'Lake View' },
  { id: 6, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80', name: 'Sunset Beach' },
];

export const SettingsPanel = ({ onClose, theme, setTheme, backgroundImage, setBackgroundImage }) => {
  const [customUrl, setCustomUrl] = useState('');

  const handleBackgroundChange = (url) => {
    setBackgroundImage(url);
    localStorage.setItem('backgroundImage', url);
    toast.success('Background updated!');
  };

  const handleCustomBackground = () => {
    if (customUrl.trim()) {
      handleBackgroundChange(customUrl.trim());
      setCustomUrl('');
    }
  };

  const exportData = () => {
    const data = {
      tasks: localStorage.getItem('tasks'),
      dailyIntentions: localStorage.getItem('dailyIntentions'),
      focusSessions: localStorage.getItem('focusSessions'),
      quickLinks: localStorage.getItem('quickLinks'),
      favoriteQuotes: localStorage.getItem('favoriteQuotes'),
      theme: localStorage.getItem('theme'),
      backgroundImage: localStorage.getItem('backgroundImage'),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindful-dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="glass-strong w-full max-w-2xl max-h-[80vh] overflow-hidden border-0 shadow-large">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Settings</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-background/50 transition-smooth"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] hide-scrollbar">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background/50 mb-6">
              <TabsTrigger value="appearance">
                <Palette className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="background">
                <Image className="h-4 w-4 mr-2" />
                Background
              </TabsTrigger>
              <TabsTrigger value="data">
                <Download className="h-4 w-4 mr-2" />
                Data
              </TabsTrigger>
            </TabsList>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                  <div>
                    <Label className="text-base font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Background Tab */}
            <TabsContent value="background" className="space-y-6">
              {/* Preset Backgrounds */}
              <div>
                <Label className="text-base font-medium mb-3 block">Choose a Background</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {backgroundPresets.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => handleBackgroundChange(bg.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-smooth hover:scale-105 ${
                        backgroundImage === bg.url
                          ? 'border-primary shadow-glow'
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={bg.url}
                        alt={bg.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <p className="absolute bottom-2 left-2 text-xs font-medium text-foreground">
                        {bg.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom URL */}
              <div>
                <Label className="text-base font-medium mb-3 block">Custom Background URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Enter image URL (https://...)"  
                    className="bg-background/50 border-border/50"
                  />
                  <Button
                    onClick={handleCustomBackground}
                    className="bg-primary hover:bg-primary-dark transition-smooth"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Data Tab */}
            <TabsContent value="data" className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/30">
                  <h3 className="text-base font-medium mb-2">Export Your Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download all your tasks, intentions, and settings as a backup file.
                  </p>
                  <Button
                    onClick={exportData}
                    className="w-full bg-primary hover:bg-primary-dark transition-smooth"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h3 className="text-base font-medium mb-2 text-destructive">Clear All Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will permanently delete all your local data. This action cannot be undone.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (window.confirm('Are you sure? This will delete all your data permanently.')) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                    className="w-full"
                  >
                    Clear All Data
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};