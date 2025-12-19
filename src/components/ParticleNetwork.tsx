import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 15000);
    
    for (let i = 0; i < Math.min(particleCount, 100); i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return particles;
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const connectionDistance = 150;
    const mouseConnectionDistance = 200;

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off walls
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Keep in bounds
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(200, 100%, 55%, ${particle.opacity})`;
      ctx.fill();

      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x;
        const dy = particles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(200, 100%, 55%, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Connect to mouse
      const mouseDx = mouse.x - particle.x;
      const mouseDy = mouse.y - particle.y;
      const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

      if (mouseDistance < mouseConnectionDistance) {
        const opacity = (1 - mouseDistance / mouseConnectionDistance) * 0.6;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `hsla(270, 100%, 60%, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Attract particle slightly to mouse
        particle.vx += mouseDx * 0.00005;
        particle.vy += mouseDy * 0.00005;
      }
    });

    // Draw mouse glow
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      gradient.addColorStop(0, 'hsla(200, 100%, 55%, 0.1)');
      gradient.addColorStop(1, 'hsla(200, 100%, 55%, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - 100, mouse.y - 100, 200, 200);
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    draw(ctx, canvas.width, canvas.height);
    animationRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default ParticleNetwork;
