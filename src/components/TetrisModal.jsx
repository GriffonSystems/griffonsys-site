import React, { useEffect, useRef, useState } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);

  const COLS = 10;
  const ROWS = 20;
  const BLOCK = 30;

  // Colors for each Tetromino
  const COLORS = {
    I: "#00f0f0",
    J: "#0000f0",
    L: "#f0a000",
    O: "#f0f000",
    S: "#00f000",
    T: "#a000f0",
    Z: "#f00000",
  };

  // Tetromino shapes
  const SHAPES = {
    I: [
      [1, 1, 1, 1]
    ],
    J: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    L: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    O: [
      [1, 1],
      [1, 1]
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    T: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1]
    ],
  };

  const randomPiece = () => {
    const keys = Object.keys(SHAPES);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return {
      shape: SHAPES[key],
      color: COLORS[key],
      x: 3,
      y: 0,
    };
  };

  let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  let piece = randomPiece();
  let dropInterval = 500;
  let lastTime = 0;
  let animationFrame;

  const drawBoard = (ctx) => {
    ctx.clearRect(0, 0, COLS * BLOCK, ROWS * BLOCK);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // Render locked blocks
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (board[y][x]) {
          ctx.fillStyle = board[y][x];
          ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK - 2, BLOCK - 2);
        }
      }
    }

    // Render active piece
    piece.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value) {
          ctx.fillStyle = piece.color;
          ctx.fillRect(
            (piece.x + dx) * BLOCK,
            (piece.y + dy) * BLOCK,
            BLOCK - 2,
            BLOCK - 2
          );
        }
      });
    });
  };

  const collision = (offsetX, offsetY) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (
          piece.shape[y][x] &&
          (board[piece.y + y + offsetY]?.[piece.x + x + offsetX] !== null ||
            piece.x + x + offsetX < 0 ||
            piece.x + x + offsetX >= COLS ||
            piece.y + y + offsetY >= ROWS)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const rotate = () => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map((row) => row[i]).reverse()
    );
    const previous = piece.shape;
    piece.shape = rotated;
    if (collision(0, 0)) piece.shape = previous;
  };

  const mergePiece = () => {
    piece.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value) {
          board[piece.y + dy][piece.x + dx] = piece.color;
        }
      });
    });
  };

  const clearLines = () => {
    board = board.filter(row => row.some(cell => cell === null) || row.every(cell => cell !== null) === false);

    const missing = ROWS - board.length;
    while (board.length < ROWS) {
      board.unshift(new Array(COLS).fill(null));
    }
  };

  const drop = () => {
    if (!collision(0, 1)) {
      piece.y++;
    } else {
      mergePiece();
      clearLines();
      piece = randomPiece();
      if (collision(0, 0)) startNewGame();
    }
  };

  const update = (time = 0) => {
    const delta = time - lastTime;
    if (delta > dropInterval) {
      drop();
      lastTime = time;
    }

    const ctx = canvasRef.current.getContext("2d");
    drawBoard(ctx);

    animationFrame = requestAnimationFrame(update);
  };

  const startNewGame = () => {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    piece = randomPiece();
    lastTime = 0;
  };

  useEffect(() => {
    if (!open) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = COLS * BLOCK;
    canvas.height = ROWS * BLOCK;

    startNewGame();
    setGameStarted(true);

    animationFrame = requestAnimationFrame(update);

    const keyHandler = (e) => {
      if (e.key === "ArrowLeft" && !collision(-1, 0)) piece.x--;
      if (e.key === "ArrowRight" && !collision(1, 0)) piece.x++;
      if (e.key === "ArrowDown" && !collision(0, 1)) piece.y++;
      if (e.key === "ArrowUp") rotate();
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      cancelAnimationFrame(animationFrame);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-4 rounded-2xl shadow-2xl relative border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-300 hover:text-white text-xl"
        >
          ×
        </button>

        <h2 className="text-center text-white text-lg mb-3 font-semibold">
          Griffon Systems — Tetris
        </h2>

        <canvas ref={canvasRef} className="bg-black rounded" />

        <p className="text-gray-400 text-xs text-center mt-3">
          ← → = Move • ↑ = Rotate • ↓ = Soft Drop
        </p>
      </div>
    </div>
  );
}
