'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check if device is mobile/touch device
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Don't render cursor glow on mobile devices
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
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
      // Check if cursor is in header, footer, or game canvas
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const gameCanvas = document.querySelector('canvas[class*="cursor-default"]');

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

      if (gameCanvas) {
        const gameRect = gameCanvas.getBoundingClientRect();
        if (
          e.clientX >= gameRect.left &&
          e.clientX <= gameRect.right &&
          e.clientY >= gameRect.top &&
          e.clientY <= gameRect.bottom
        ) {
          inExclusionZone = true;
        }
      }

      if (!inExclusionZone) {
        positionRef.current.targetX = e.clientX;
        positionRef.current.targetY = e.clientY;
      } else {
        // Move ball off screen when in exclusion zone
        positionRef.current.targetX = -100;
        positionRef.current.targetY = -100;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with easing
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;

      // Smooth easing
      const ease = 0.15 * deltaTime;
      positionRef.current.x += (positionRef.current.targetX - positionRef.current.x) * ease;
      positionRef.current.y += (positionRef.current.targetY - positionRef.current.y) * ease;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = positionRef.current;
      const ballRadius = 30;

      // Draw ping pong ball shadow
      ctx.save();
      ctx.globalAlpha = 0.3;
      const shadowGradient = ctx.createRadialGradient(x, y + 35, 0, x, y + 35, 25);
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGradient;
      ctx.fillRect(x - 25, y + 10, 50, 50);
      ctx.restore();

      // Draw main ping pong ball
      const ballGradient = ctx.createRadialGradient(
        x - ballRadius * 0.3,
        y - ballRadius * 0.3,
        0,
        x,
        y,
        ballRadius
      );
      ballGradient.addColorStop(0, '#FFFFFF');
      ballGradient.addColorStop(0.4, '#F8F8F8');
      ballGradient.addColorStop(0.8, '#E0E0E0');
      ballGradient.addColorStop(1, '#C0C0C0');

      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = ballGradient;
      ctx.fill();

      // Add highlight
      const highlightGradient = ctx.createRadialGradient(
        x - ballRadius * 0.4,
        y - ballRadius * 0.4,
        0,
        x - ballRadius * 0.4,
        y - ballRadius * 0.4,
        ballRadius * 0.5
      );
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = highlightGradient;
      ctx.fill();

      // Draw seam curves
      ctx.strokeStyle = 'rgba(220, 220, 220, 0.6)';
      ctx.lineWidth = 1.5;

      // Top curve
      ctx.beginPath();
      ctx.arc(x, y, ballRadius * 0.7, -Math.PI * 0.3, Math.PI * 0.3);
      ctx.stroke();

      // Bottom curve
      ctx.beginPath();
      ctx.arc(x, y, ballRadius * 0.7, Math.PI * 0.7, Math.PI * 1.3);
      ctx.stroke();

      // Add subtle glow around the ball
      const glowGradient = ctx.createRadialGradient(x, y, ballRadius, x, y, ballRadius + 20);
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(x, y, ballRadius + 20, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

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
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        willChange: 'transform',
      }}
    />
  );
}
