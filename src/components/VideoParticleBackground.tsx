import React, { useEffect, useRef } from 'react';

const VideoParticleBackground = () => {
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

    // Star class for galaxy effect
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        this.opacity = 0.2 + 0.3 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }



    // Particle class for connections
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > (canvas?.width || 0)) this.vx *= -1;
        if (this.y < 0 || this.y > (canvas?.height || 0)) this.vy *= -1;

        this.x = Math.max(0, Math.min(this.x, canvas?.width || 0));
        this.y = Math.max(0, Math.min(this.y, canvas?.height || 0));
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create galaxy elements
    const stars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push(new Star());
    }



    // Create particles for connections
    const particles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle());
    }

    let time = 0;

    // Animation loop
    const animate = () => {
      time += 0.01;
      
      // Clear canvas with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula effect
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      gradient.addColorStop(0.5, 'rgba(147, 197, 253, 0.02)');
      gradient.addColorStop(1, 'rgba(191, 219, 254, 0.01)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        star.update(time);
        star.draw();
      });



      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const opacity = 0.15 * (1 - distance / 80);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Galaxy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"></div>
      
      {/* Nebula overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-blue-400/5 animate-pulse"></div>
      
      {/* Additional galaxy overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/3 to-transparent animate-pulse"></div>

      {/* Particle canvas with subtle blur effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, filter: 'blur(0.5px)' }}
      />
      
      {/* Very subtle blur overlay */}
      <div className="absolute inset-0 bg-black/3" style={{ filter: 'blur(0.3px)' }}></div>
      
      {/* Test indicator */}
      <div className="absolute top-4 right-4 text-white bg-blue-500 p-2 rounded z-50">
        Light Blue Galaxy
      </div>
    </div>
  );
};

export default VideoParticleBackground; 