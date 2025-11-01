import React from 'react';

const defaultBackgrounds = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Mountain landscape
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80', // Forest path
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80', // Misty mountains
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=80', // Flower field
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80', // Lake view
];

export const BackgroundManager = ({ backgroundImage, setBackgroundImage }) => {
  const currentBg = backgroundImage || defaultBackgrounds[0];
  
  return (
    <>
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentBg})`,
        }}
      />
      
      {/* Gradient Overlay for better text readability */}
      <div className="fixed inset-0 z-[1] bg-gradient-overlay" />
      
      {/* Subtle noise texture */}
      <div 
        className="fixed inset-0 z-[2] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};