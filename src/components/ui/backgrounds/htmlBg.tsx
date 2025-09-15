import React, { useRef, useEffect } from 'react';

interface GridOffset {
  x: number;
  y: number;
}

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  isDark: boolean;
  squareSize?: number;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 1,
  squareSize = 40,
  isDark,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);

  const borderColor = isDark ? '#c2d9c1' : '#f86fff';
  const hoverFillColor = isDark ? '#974ce7' : '#ffee00';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!offscreenCtx || !ctx) return;

      offscreenCtx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = Math.round(x - (gridOffset.current.x % squareSize));
          const squareY = Math.round(y - (gridOffset.current.y % squareSize));

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) ===
              hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            offscreenCtx.fillStyle = hoverFillColor;
            offscreenCtx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          offscreenCtx.strokeStyle = borderColor;
          offscreenCtx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);
    };

    const updateAnimation = (timestamp: number) => {
      if (
        !lastFrameTimeRef.current ||
        timestamp - lastFrameTimeRef.current > 16.67
      ) {
        const effectiveSpeed = Math.max(speed, 0.1);
        switch (direction) {
          case 'right':
            gridOffset.current.x =
              (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
            break;
          case 'left':
            gridOffset.current.x =
              (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
            break;
          case 'up':
            gridOffset.current.y =
              (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
            break;
          case 'down':
            gridOffset.current.y =
              (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
            break;
          case 'diagonal':
            gridOffset.current.x =
              (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
            gridOffset.current.y =
              (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
            break;
          default:
            break;
        }

        drawGrid();
        lastFrameTimeRef.current = timestamp;
      }

      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className='w-full h-full border-none block'
    ></canvas>
  );
};

export default Squares;
