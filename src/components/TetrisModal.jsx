import React, { useEffect, useRef, useState } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const logoRef = useRef(null);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // ----- GAME CONSTANTS -----
  const ROWS = 20;
  const COLS = 10;
  const BLOCK = 30;
  const DROP_SPEED = 550;

  const colors = [
    null,
    "#00f0f0",
    "#0000f0",
    "#f0a000",
    "#f0f000",
    "#00f000",
    "#a000f0",
    "#f00000",
  ];

  const shapes = [
    [],
    [[1, 1, 1, 1]],
    [
      [2, 0, 0],
      [2, 2, 2],
    ],
    [
      [0, 0, 3],
      [3, 3, 3],
    ],
    [
      [4, 4],
      [4, 4],
    ],
    [
      [0, 5, 5],
      [5, 5, 0],
    ],
    [
      [6, 6, 0],
      [0, 6, 6],
    ],
    [
      [7, 7, 7],
      [0, 7, 0],
    ],
  ];

  let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  let piece = null;
  let lastDrop = 0;

  // PRELOAD LOGO
  useEffect(() => {
    const img = new Image();
    img.src = "/logos/griffon_logo.svg";
    img.onload = () => (logoRef.current = img);
  }, []);

  // NEW PIECE
  const randomPiece = () => {
    const type = Math.floor(Math.random() * 7) + 1;
    return {
      shape: shapes[type].map((row) => [...row]),
      x: 3,
      y: 0,
      type,
    };
  };

  // COLLISION
  const collide = (p) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c] !== 0) {
          let nx = p.x + c;
          let ny = p.y + r;
          if (
            nx < 0 ||
            nx >= COLS ||
            ny >= ROWS ||
            (ny >= 0 && board[ny][nx] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const merge = (p) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c] !== 0) {
          board[p.y + r][p.x + c] = p.type;
        }
      }
    }
  };

  // ROTATE
  const rotatePiece = () => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map((row) => row[i]).reverse()
    );
    const test = { ...piece, shape: rotated };
    if (!collide(test)) piece.shape = rotated;
  };

  const movePiece = (dir) => {
    const test = { ...piece, x: piece.x + dir };
    if (!collide(test)) piece.x += dir;
  };

  const dropFast = () => {
    while (!collide({ ...piece, y: piece.y + 1 })) {
      piece.y++;
    }
  };

  const clearLines = () => {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r].every((cell) => cell !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        cleared++;
        r++;
      }
    }
    if (cleared) setScore((s) => s + cleared * 100);
  };

  // DRAW
  const draw = (ctx) => {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // board
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] !== 0) {
          ctx.fillStyle = colors[board[r][c]];
          ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK - 1, BLOCK - 1);
        }
      }
    }

    // active piece
    if (piece) {
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
          if (piece.shape[r][c] !== 0) {
            ctx.fillStyle = colors[piece.type];
            ctx.fillRect(
              (piece.x + c) * BLOCK,
              (piece.y + r) * BLOCK,
              BLOCK - 1,
              BLOCK - 1
            );
          }
        }
      }
    }

    // WATERMARK — STRONGER + CENTERED
    if (logoRef.current) {
      const size = 90;
      ctx.save();
      ctx.globalAlpha = 0.38; // <-- MUCH MORE VISIBLE
      ctx.drawImage(
        logoRef.current,
        (COLS * BLOCK) / 2 - size / 2,
        (ROWS * BLOCK) / 2 - size / 2,
        size,
        size
      );
      ctx.restore();
    }
  };

  // GAME LOOP
  const loop = (time, ctx) => {
    if (!open || gameOver) return;

    if (time - lastDrop > DROP_SPEED) {
      lastDrop = time;
      piece.y++;

      if (collide(piece)) {
        piece.y--;
        merge(piece);
        clearLines();
        piece = randomPiece();
        if (collide(piece)) {
          setGameOver(true);
          return;
        }
      }
    }

    draw(ctx);
    requestAnimationFrame((t) => loop(t, ctx));
  };

  const startGame = () => {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    piece = randomPiece();
    setScore(0);
    setGameOver(false);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    requestAnimationFrame((t) => {
      lastDrop = t;
      loop(t, ctx);
    });
  };

  // CONTROLS
  useEffect(() => {
    const handle = (e) => {
      if (!open || gameOver) return;

      if (e.key === "ArrowLeft") movePiece(-1);
      if (e.key === "ArrowRight") movePiece(1);
      if (e.key === "ArrowUp") rotatePiece();
      if (e.key === "ArrowDown") piece.y++;
      if (e.key === " ") dropFast();
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, gameOver]);

  useEffect(() => {
    if (open) startGame();
  }, [open]);

  return (
    open && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-6 relative w-[420px]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>

          <h2 className="text-xl font-semibold mb-2 text-center">
            Griffon Tetris
          </h2>

          <canvas
            ref={canvasRef}
            width={COLS * BLOCK}
            height={ROWS * BLOCK}
            className="border border-gray-200 mx-auto mb-3 rounded-lg bg-black"
          />

          <p className="text-center text-lg mb-4 font-medium">Score: {score}</p>

          {gameOver && (
            <div className="text-center">
              <p className="text-red-500 font-bold text-lg mb-3">GAME OVER</p>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                onClick={startGame}
              >
                Restart
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}
