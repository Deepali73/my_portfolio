import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple star class
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create stars
    const stars: Star[] = [];
    for (let i = 0; i < 50; i++) {
      stars.push(new Star());
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      {/* Visible gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900"></div>
      
      {/* Canvas for stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default AnimatedBackground;