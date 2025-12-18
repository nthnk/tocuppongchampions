'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // GPU optimization
      willReadFrequently: false
    });
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Mouse move handler with exclusion zones
    const handleMouseMove = (e: MouseEvent) => {
      // Check if cursor is in header or footer
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');

      let inExclusionZone = false;

      if (header) {
        const headerRect = header.getBoundingClientRect();
        if (e.clientY <= headerRect.bottom) {
          inExclusionZone = true;
        }
      }

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (e.clientY >= footerRect.top) {
          inExclusionZone = true;
        }
      }

      if (!inExclusionZone) {
        positionRef.current.targetX = e.clientX;
        positionRef.current.targetY = e.clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color scale using d3
    const colorScale = d3.scaleLinear<string>()
      .domain([0, 0.5, 1])
      .range(['#3b82f6', '#8b5cf6', '#ec4899']); // blue -> purple -> pink

    // Animation loop with easing
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to 60fps
      lastTime = currentTime;

      // Smooth easing
      const ease = 0.1 * deltaTime;
      positionRef.current.x += (positionRef.current.targetX - positionRef.current.x) * ease;
      positionRef.current.y += (positionRef.current.targetY - positionRef.current.y) * ease;

      // Clear canvas with GPU-accelerated compositing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = positionRef.current;

      // Create radial gradient for glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300);

      // Use d3 color interpolation for smooth color transitions
      const time = Date.now() / 2000;
      const colorValue1 = Math.abs(Math.sin(time));
      const colorValue2 = Math.abs(Math.cos(time + Math.PI / 3));

      // Convert d3 color to rgba with opacity
      const color1 = d3.rgb(colorScale(colorValue1));
      const color2 = d3.rgb(colorScale(colorValue2));

      gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.5)`);
      gradient.addColorStop(0.3, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.25)`);
      gradient.addColorStop(0.6, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.125)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      // Draw glow with GPU-accelerated blend mode
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add central bright spot
      const centralGradient = ctx.createRadialGradient(x, y, 0, x, y, 100);
      centralGradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.38)`);
      centralGradient.addColorStop(0.5, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.19)`);
      centralGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = centralGradient;
      ctx.fillRect(x - 100, y - 100, 200, 200);

      // Multiple bubble particles for depth
      const particleCount = 3;
      for (let i = 0; i < particleCount; i++) {
        const offset = (time + i * Math.PI * 2 / particleCount) % (Math.PI * 2);
        const radius = 50 + i * 30;
        const particleX = x + Math.cos(offset) * 40;
        const particleY = y + Math.sin(offset) * 40;

        const particleGradient = ctx.createRadialGradient(
          particleX, particleY, 0,
          particleX, particleY, radius
        );

        const particleColorValue = (i / particleCount + time / 2) % 1;
        const particleColor = d3.rgb(colorScale(particleColorValue));
        particleGradient.addColorStop(0, `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, 0.25)`);
        particleGradient.addColorStop(0.5, `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, 0.125)`);
        particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = particleGradient;
        ctx.fillRect(
          particleX - radius,
          particleY - radius,
          radius * 2,
          radius * 2
        );
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: 'screen',
        willChange: 'transform', // GPU acceleration hint
      }}
    />
  );
}
