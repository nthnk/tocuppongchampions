'use client';

import { useState, useRef, useEffect } from 'react';

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
  const animationFrameRef = useRef<number>();
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

      ctx.fillStyle = `rgba(59, 130, 246, ${pulseAlpha})`;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Strong glow when grabbed/dragging
    if (ball.isGrabbed || ball.isDragging) {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
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
      gradient.addColorStop(0, '#e0f2fe');
      gradient.addColorStop(0.5, '#bae6fd');
      gradient.addColorStop(1, '#7dd3fc');
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
    ctx.fillStyle = '#0f172a';
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
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
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
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
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
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 10);
      ctx.fill();
      ctx.stroke();

      // Draw filled portion with gradient
      const fillHeight = barHeight * strength;
      const gradient = ctx.createLinearGradient(barX, barY + barHeight, barX, barY);

      // Create color gradient from green to yellow to orange to red
      gradient.addColorStop(0, '#22c55e');    // green
      gradient.addColorStop(0.33, '#eab308'); // yellow
      gradient.addColorStop(0.66, '#f97316'); // orange
      gradient.addColorStop(1, '#ef4444');    // red

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(barX, barY + barHeight - fillHeight, barWidth, fillHeight, 10);
      ctx.fill();

      // Draw "POWER" label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('POWER', barX + barWidth / 2, barY - 10);

      // Draw percentage
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
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
    <section className="py-24 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Try Your Shot
          </h2>
          <p className="text-slate-400 text-lg mb-4">
            Think you've got what it takes? Test your aim with our mini cup pong game!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm cursor-default">
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">{score}</div>
              <div className="text-sm text-slate-400">Cups Hit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">{attempts}</div>
              <div className="text-sm text-slate-400">Attempts</div>
            </div>
          </div>

          {/* Game Canvas */}
          <div className="relative">
            {showInstructions && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10 p-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">How to Play</h3>
                  <div className="text-slate-300 space-y-2 text-left max-w-sm">
                    <p>1. Click ON the white ball at the bottom</p>
                    <p>2. Drag in the opposite direction you want to throw</p>
                    <p>3. Release to launch the ball</p>
                    <p>4. Hit all 6 cups to win!</p>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                >
                  Start Game
                </button>
              </div>
            )}

            {showPerfectScore && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20 p-6">
                <div className="text-center animate-bounce">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4">
                    PERFECT SCORE!
                  </h3>
                  <p className="text-xl text-white font-bold mb-2">
                    6 Cups in 6 Attempts!
                  </p>
                  <p className="text-slate-300">
                    You're a natural! 🏆
                  </p>
                </div>
              </div>
            )}

            {showHitMessage && (
              <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                <div className="text-7xl md:text-8xl font-black text-green-400 animate-ping">
                  HIT!
                </div>
              </div>
            )}

            {showMissMessage && (
              <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                <div className="text-7xl md:text-8xl font-black text-red-400 animate-ping">
                  MISS!
                </div>
              </div>
            )}

            {showGameOver && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20 p-6">
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                    {finalAttempts === 6 ? 'Perfect Game! 🏆' : 'Game Complete! 🎯'}
                  </h3>
                  <div className="bg-white/10 rounded-xl p-6 mb-6">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                      {finalAttempts > 0 ? Math.round((finalScore / finalAttempts) * 100) : 0}%
                    </div>
                    <p className="text-slate-300 text-lg">Hit Percentage</p>
                    <p className="text-slate-400 text-sm mt-2">
                      {finalScore} cups in {finalAttempts} attempts
                    </p>
                  </div>
                  <button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              className="w-full border border-white/20 rounded-xl cursor-default"
              style={{ display: 'block' }}
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
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-semibold transition-colors"
              >
                Reset Game
              </button>
              <button
                onClick={() => {
                  setShowInstructions(true);
                  setShowGameOver(false);
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-semibold transition-colors"
              >
                Show Instructions
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Like what you see? Join the tournament and compete for real!
          </p>
        </div>
      </div>
    </section>
  );
}
