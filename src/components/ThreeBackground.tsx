import React from 'react';

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-xl animate-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-white/20 rounded-full blur-xl animate-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-white/20 to-primary-500/20 rounded-full blur-lg animate-glow" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default ThreeBackground; 