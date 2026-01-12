'use client';

import { useState, useRef, useEffect } from 'react';
import { palette, fonts } from '@/lib/theme';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isDragging: boolean;
  isFlying: boolean;
  isGrabbed: boolean;
}

interface Cup {
  x: number;
  y: number;
  width: number;
  height: number;
  isHit: boolean;
}

export function CupPongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showPerfectScore, setShowPerfectScore] = useState(false);
  const [showHitMessage, setShowHitMessage] = useState(false);
  const [showMissMessage, setShowMissMessage] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalAttempts, setFinalAttempts] = useState(0);

  const ballRef = useRef<Ball>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 15,
    isDragging: false,
    isFlying: false,
    isGrabbed: false
  });

  const cupsRef = useRef<Cup[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const ballStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const currentAttemptsRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = Math.min(600, container.clientWidth - 32);
        canvas.height = 500;
        initGame();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Separate effect to start animation when game becomes active
  useEffect(() => {
    if (isGameActive && !animationFrameRef.current) {
      console.log('Game activated, starting animation');
      animate();
    }
  }, [isGameActive]);

  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize ball at bottom center with more room below
    ballRef.current = {
      x: canvas.width / 2,
      y: canvas.height - 180,
      vx: 0,
      vy: 0,
      radius: 15,
      isDragging: false,
      isFlying: false,
      isGrabbed: false
    };

    // Initialize cups in pyramid formation (3 rows)
    const cupWidth = 50;
    const cupHeight = 60;
    const startY = 60;
    const spacing = 10;

    cupsRef.current = [];

    // Top row (1 cup)
    cupsRef.current.push({
      x: canvas.width / 2 - cupWidth / 2,
      y: startY,
      width: cupWidth,
      height: cupHeight,
      isHit: false
    });

    // Middle row (2 cups)
    for (let i = 0; i < 2; i++) {
      cupsRef.current.push({
        x: canvas.width / 2 - cupWidth - spacing / 2 + i * (cupWidth + spacing),
        y: startY + cupHeight + spacing,
        width: cupWidth,
        height: cupHeight,
        isHit: false
      });
    }

    // Bottom row (3 cups)
    for (let i = 0; i < 3; i++) {
      cupsRef.current.push({
        x: canvas.width / 2 - cupWidth * 1.5 - spacing + i * (cupWidth + spacing),
        y: startY + (cupHeight + spacing) * 2,
        width: cupWidth,
        height: cupHeight,
        isHit: false
      });
    }
  };

  const drawCup = (ctx: CanvasRenderingContext2D, cup: Cup) => {
    if (cup.isHit) return;

    ctx.save();

    // Cup body (trapezoid - wider at top, narrower at bottom)
    ctx.fillStyle = '#ef4444'; // red
    ctx.beginPath();
    ctx.moveTo(cup.x, cup.y); // top left
    ctx.lineTo(cup.x + cup.width, cup.y); // top right
    ctx.lineTo(cup.x + cup.width - 5, cup.y + cup.height); // bottom right
    ctx.lineTo(cup.x + 5, cup.y + cup.height); // bottom left
    ctx.closePath();
    ctx.fill();

    // Cup rim at top
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cup.x, cup.y, cup.width, 5);

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(cup.x + 8, cup.y + 5);
    ctx.lineTo(cup.x + 15, cup.y + 5);
    ctx.lineTo(cup.x + 14, cup.y + cup.height - 10);
    ctx.lineTo(cup.x + 9, cup.y + cup.height - 10);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
    ctx.save();

    // Pulsing glow effect when not flying (to indicate it's clickable)
    if (!ball.isFlying && !ball.isDragging) {
      const pulseTime = Date.now() / 1000;
      const pulseAlpha = 0.3 + Math.sin(pulseTime * 3) * 0.2;

      ctx.fillStyle = `${palette.orange}${Math.round(pulseAlpha * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Strong glow when grabbed/dragging
    if (ball.isGrabbed || ball.isDragging) {
      ctx.fillStyle = `${palette.orange}99`;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `${palette.orange}66`;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 18, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ball shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(ball.x, ball.y + 2, ball.radius, ball.radius * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ball
    const gradient = ctx.createRadialGradient(
      ball.x - ball.radius / 3,
      ball.y - ball.radius / 3,
      0,
      ball.x,
      ball.y,
      ball.radius
    );

    // Change ball color when grabbed
    if (ball.isGrabbed || ball.isDragging) {
      gradient.addColorStop(0, palette.cream);
      gradient.addColorStop(0.5, palette.orangeLight);
      gradient.addColorStop(1, palette.orange);
    } else {
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.5, '#f0f0f0');
      gradient.addColorStop(1, '#d0d0d0');
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const checkCollision = (ball: Ball, cup: Cup): boolean => {
    if (cup.isHit) return false;

    const ballCenterX = ball.x;
    const ballCenterY = ball.y;

    // Check if ball center is within the cup opening at the top
    const cupTopWidth = cup.width;
    const cupTopLeft = cup.x;
    const cupTopRight = cup.x + cupTopWidth;
    const cupTopY = cup.y;
    const cupBottomY = cup.y + cup.height;

    // Ball must be near the cup top opening
    const isInHorizontalRange = ballCenterX >= cupTopLeft && ballCenterX <= cupTopRight;
    const isAtCorrectHeight = ballCenterY >= cupTopY - ball.radius && ballCenterY <= cupTopY + 20;

    // Ball should be moving downward when it hits
    const isMovingDown = ball.vy > 0;

    return isInHorizontalRange && isAtCorrectHeight && isMovingDown;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ball = ballRef.current;

    // Clear canvas
    ctx.fillStyle = palette.cream;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw cups
    cupsRef.current.forEach(cup => drawCup(ctx, cup));

    // Update ball physics
    if (ball.isFlying && !ball.isDragging) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.vy += 0.5; // gravity

      // Check collisions with cups
      cupsRef.current.forEach(cup => {
        if (checkCollision(ball, cup)) {
          cup.isHit = true;
          setScore(prev => prev + 1);
          ball.isFlying = false;

          // Show HIT message
          setShowHitMessage(true);
          setTimeout(() => setShowHitMessage(false), 1000);

          // Check if all cups are hit
          if (cupsRef.current.every(c => c.isHit)) {
            // Save final stats using the ref which has the current attempt count
            const finalAttemptCount = currentAttemptsRef.current;
            setFinalScore(6);
            setFinalAttempts(finalAttemptCount);

            // Check for perfect score (6 cups in 6 attempts)
            if (finalAttemptCount === 6) {
              setShowPerfectScore(true);
              setTimeout(() => setShowPerfectScore(false), 2000);
            }

            // Show game over screen quickly (with slight delay for perfect score message if applicable)
            setTimeout(() => {
              setShowGameOver(true);
            }, finalAttemptCount === 6 ? 2000 : 500);
          } else {
            setTimeout(() => {
              ball.x = canvas.width / 2;
              ball.y = canvas.height - 180;
              ball.vx = 0;
              ball.vy = 0;
              ball.isGrabbed = false;
            }, 500);
          }
        }
      });

      // Reset if ball goes out of bounds
      if (ball.y > canvas.height + 50 || ball.x < -50 || ball.x > canvas.width + 50) {
        ball.isFlying = false;
        ball.isGrabbed = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 180;
        ball.vx = 0;
        ball.vy = 0;

        // Show MISS message
        setShowMissMessage(true);
        setTimeout(() => setShowMissMessage(false), 1000);
      }
    }

    // Draw ball
    drawBall(ctx, ball);

    // Draw trajectory line when dragging
    if (ball.isDragging && dragStartRef.current && ballStartPosRef.current) {
      ctx.strokeStyle = `${palette.orange}80`;
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(ballStartPosRef.current.x, ballStartPosRef.current.y);
      ctx.lineTo(dragStartRef.current.x, dragStartRef.current.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw arrow at the end
      const angle = Math.atan2(
        dragStartRef.current.y - ballStartPosRef.current.y,
        dragStartRef.current.x - ballStartPosRef.current.x
      );
      const arrowSize = 10;
      ctx.fillStyle = `${palette.orange}80`;
      ctx.beginPath();
      ctx.moveTo(dragStartRef.current.x, dragStartRef.current.y);
      ctx.lineTo(
        dragStartRef.current.x - arrowSize * Math.cos(angle - Math.PI / 6),
        dragStartRef.current.y - arrowSize * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        dragStartRef.current.x - arrowSize * Math.cos(angle + Math.PI / 6),
        dragStartRef.current.y - arrowSize * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Draw strength bar
      const dx = ballStartPosRef.current.x - dragStartRef.current.x;
      const dy = ballStartPosRef.current.y - dragStartRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200; // Maximum drag distance for full power
      const strength = Math.min(distance / maxDistance, 1);

      // Strength bar dimensions
      const barWidth = 20;
      const barHeight = canvas.height * 0.6;
      const barX = canvas.width - 40;
      const barY = canvas.height * 0.2;

      // Draw bar background
      ctx.fillStyle = `${palette.orange}1A`;
      ctx.strokeStyle = `${palette.orange}4D`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 10);
      ctx.fill();
      ctx.stroke();

      // Draw filled portion with gradient
      const fillHeight = barHeight * strength;
      const gradient = ctx.createLinearGradient(barX, barY + barHeight, barX, barY);

      // Create color gradient using brand colors
      gradient.addColorStop(0, palette.orange);
      gradient.addColorStop(0.33, palette.orangeLight);
      gradient.addColorStop(0.66, palette.gold);
      gradient.addColorStop(1, palette.orange);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(barX, barY + barHeight - fillHeight, barWidth, fillHeight, 10);
      ctx.fill();

      // Draw "POWER" label
      ctx.fillStyle = palette.slate;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('POWER', barX + barWidth / 2, barY - 10);

      // Draw percentage
      ctx.fillStyle = palette.slate;
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`${Math.round(strength * 100)}%`, barX + barWidth / 2, barY + barHeight + 25);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleStart = (clientX: number, clientY: number) => {
    console.log('handleStart called', { isGameActive, clientX, clientY });
    if (!isGameActive) {
      console.log('Game not active, returning');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('No canvas, returning');
      return;
    }

    const rect = canvas.getBoundingClientRect();
    // Scale coordinates to match canvas internal resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ball = ballRef.current;
    const dx = x - ball.x;
    const dy = y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    console.log('Click detection', { x, y, ballX: ball.x, ballY: ball.y, distance, threshold: ball.radius + 40, isFlying: ball.isFlying, scaleX, scaleY });

    if (distance < ball.radius + 40 && !ball.isFlying) {
      console.log('Ball grabbed!');
      ball.isGrabbed = true;
      ball.isDragging = true;
      ballStartPosRef.current = { x: ball.x, y: ball.y };
      dragStartRef.current = { x, y };
    } else {
      console.log('Click outside ball or ball is flying');
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !ballRef.current.isDragging) return;

    const rect = canvas.getBoundingClientRect();
    // Scale coordinates to match canvas internal resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    dragStartRef.current = { x, y };
  };

  const handleEnd = () => {
    const ball = ballRef.current;
    if (!ball.isDragging || !ballStartPosRef.current || !dragStartRef.current) return;

    ball.isDragging = false;
    ball.isGrabbed = false;
    ball.isFlying = true;

    // Calculate velocity based on drag distance from original ball position
    const dx = ballStartPosRef.current.x - dragStartRef.current.x;
    const dy = ballStartPosRef.current.y - dragStartRef.current.y;

    ball.vx = dx * 0.2;
    ball.vy = dy * 0.2;

    dragStartRef.current = null;
    ballStartPosRef.current = null;
    setAttempts(prev => {
      const newAttempts = prev + 1;
      currentAttemptsRef.current = newAttempts;
      return newAttempts;
    });
  };

  const startGame = () => {
    setIsGameActive(true);
    setShowInstructions(false);
    setShowPerfectScore(false);
    setScore(0);
    setAttempts(0);
    currentAttemptsRef.current = 0;
    initGame();

    // Force start animation loop
    setTimeout(() => {
      if (!animationFrameRef.current) {
        console.log('Starting animation loop');
        animate();
      }
    }, 0);
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setShowPerfectScore(false);
    setShowGameOver(false);
    setFinalScore(0);
    setFinalAttempts(0);
    currentAttemptsRef.current = 0;
    initGame();
  };

  return (
    <section className="py-24 px-6" style={{ borderTop: `1px solid ${palette.orange}33` }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: fonts.heading, color: palette.blue }}>
            Try Your Shot
          </h2>
          <p className="text-lg mb-4" style={{ fontFamily: fonts.body, color: palette.gray100 }}>
            Think you've got what it takes? Test your aim with our mini cup pong game!
          </p>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(to right, ${palette.red}, ${palette.orange}, ${palette.blue})` }} />
        </div>

        <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm cursor-default" style={{ background: `${palette.slate}E6`, border: `1px solid ${palette.blue}33` }}>
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black" style={{ color: palette.orange }}>{score}</div>
              <div className="text-sm" style={{ fontFamily: fonts.body, color: palette.gray100 }}>Cups Hit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black" style={{ color: palette.blue }}>{attempts}</div>
              <div className="text-sm" style={{ fontFamily: fonts.body, color: palette.gray100 }}>Attempts</div>
            </div>
          </div>

          {/* Game Canvas */}
          <div className="relative">
            {showInstructions && (
              <div className="absolute inset-0 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10 p-6" style={{ background: `${palette.slate}F2` }}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: fonts.body, color: palette.white }}>How to Play</h3>
                  <div className="space-y-2 text-left max-w-sm" style={{ fontFamily: fonts.body, color: palette.gray100 }}>
                    <p>1. Click ON the white ball at the bottom</p>
                    <p>2. Drag in the opposite direction you want to throw</p>
                    <p>3. Release to launch the ball</p>
                    <p>4. Hit all 6 cups to win!</p>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                  style={{ background: `linear-gradient(to right, ${palette.orange}, ${palette.orangeLight})`, color: palette.cream }}
                >
                  Start Game
                </button>
              </div>
            )}

            {showPerfectScore && (
              <div className="absolute inset-0 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20 p-6" style={{ background: `${palette.slate}F2` }}>
                <div className="text-center animate-bounce">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: fonts.heading, color: palette.orange }}>
                    PERFECT SCORE!
                  </h3>
                  <p className="text-xl font-bold mb-2" style={{ fontFamily: fonts.body, color: palette.white }}>
                    6 Cups in 6 Attempts!
                  </p>
                  <p style={{ fontFamily: fonts.body, color: palette.gray100 }}>
                    You're a natural! 🏆
                  </p>
                </div>
              </div>
            )}

            {showHitMessage && (
              <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                <div className="text-7xl md:text-8xl font-black animate-ping" style={{ color: palette.orange }}>
                  HIT!
                </div>
              </div>
            )}

            {showMissMessage && (
              <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                <div className="text-7xl md:text-8xl font-black animate-ping" style={{ color: palette.orangeLight }}>
                  MISS!
                </div>
              </div>
            )}

            {showGameOver && (
              <div className="absolute inset-0 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20 p-6" style={{ background: `${palette.slate}F2` }}>
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: fonts.heading, color: palette.orange }}>
                    {finalAttempts === 6 ? 'Perfect Game! 🏆' : 'Game Complete! 🎯'}
                  </h3>
                  <div className="rounded-xl p-6 mb-6" style={{ background: `${palette.orange}33`, border: `1px solid ${palette.orange}` }}>
                    <div className="text-6xl font-black mb-2" style={{ color: palette.orange }}>
                      {finalAttempts > 0 ? Math.round((finalScore / finalAttempts) * 100) : 0}%
                    </div>
                    <p className="text-lg" style={{ fontFamily: fonts.body, color: palette.white }}>Hit Percentage</p>
                    <p className="text-sm mt-2" style={{ fontFamily: fonts.body, color: palette.gray100 }}>
                      {finalScore} cups in {finalAttempts} attempts
                    </p>
                  </div>
                  <button
                    onClick={resetGame}
                    className="px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                    style={{ background: `linear-gradient(to right, ${palette.orange}, ${palette.orangeLight})`, color: palette.cream }}
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              className="w-full rounded-xl cursor-default"
              style={{ display: 'block', border: `1px solid ${palette.orange}4D` }}
              onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                handleStart(touch.clientX, touch.clientY);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                handleMove(touch.clientX, touch.clientY);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleEnd();
              }}
            />
          </div>

          {/* Controls */}
          {isGameActive && (
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={resetGame}
                className="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
                style={{ background: `${palette.red}33`, color: palette.white, border: `1px solid ${palette.red}` }}
              >
                Reset Game
              </button>
              <button
                onClick={() => {
                  setShowInstructions(true);
                  setShowGameOver(false);
                }}
                className="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
                style={{ background: `${palette.blue}33`, color: palette.white, border: `1px solid ${palette.blue}` }}
              >
                Show Instructions
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm" style={{ fontFamily: fonts.body, color: palette.gray100 }}>
            Like what you see? Join the tournament and compete for real!
          </p>
        </div>
      </div>
    </section>
  );
}
