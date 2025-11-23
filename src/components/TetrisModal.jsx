import React, { useEffect, useRef, useState } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Board
  const ROWS = 20;
  const COLS = 10;
  const BLOCK = 28;

  // Level 3 speed (fast but playable)
  const DROP_SPEED = 180; // ms per row drop

  let piece = null;
  let board = [];

  // Colors
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

  // Shapes
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
    [[7, 7, 7], [0, 7, 0]],
  ];

  // -----------------------------------
  // Board functions
  // -----------------------------------

  const resetBoard = () => {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  };

  const randomPiece = () => {
    const type = Math.floor(Math.random() * 7) + 1;
    return {
      shape: shapes[type].map((r) => [...r]),
      x: 3,
      y: 0,
      type,
    };
  };

  const collide = (p) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c] !== 0) {
          let newX = p.x + c;
          let newY = p.y + r;

          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && board[newY][newX] !== 0)
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

  const rotatePiece = (p) => {
    const rotated = p.shape[0].map((_, i) =>
      p.shape.map((row) => row[i]).reverse()
    );
    return { ...p, shape: rotated };
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

    if (cleared > 0) setScore((s) => s + cleared * 100);
  };

  // -----------------------------------
  // Drawing
  // -----------------------------------

  const draw = (ctx) => {
    ctx.clearRect(0, 0, COLS * BLOCK, ROWS * BLOCK);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // Draw board blocks
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] !== 0) {
          ctx.fillStyle = colors[board[r][c]];
          ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK - 1, BLOCK - 1);
        }
      }
    }

    // Draw piece
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

    // ---------------------------
    // Griffon Logo (top center)
    // ---------------------------
    const logo = new Image();
    logo.src = "/logos/RLOGO0.bmp";

    logo.onload = () => {
      const logoW = 140;
      const logoH = 60;
      ctx.globalAlpha = 0.4; // requested 0.40 opacity
      ctx.drawImage(
        logo,
        COLS * BLOCK / 2 - logoW / 2,
        10,
        logoW,
        logoH
      );
      ctx.globalAlpha = 1.0;
    };
  };

  // -----------------------------------
  // Game Loop
  // -----------------------------------
  const gameTick = (ctx) => {
    if (!open || gameOver) return;

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

    draw(ctx);
    setTimeout(() => requestAnimationFrame(() => gameTick(ctx)), DROP_SPEED);
  };

  const startGame = () => {
    resetBoard();
    piece = randomPiece();
    setScore(0);
    setGameOver(false);

    const ctx = canvasRef.current.getContext("2d");
    draw(ctx);
    requestAnimationFrame(() => gameTick(ctx));
  };

  // -----------------------------------
  // Keyboard Controls
  // -----------------------------------
  useEffect(() => {
    const handleKey = (e) => {
      if (!piece || gameOver || !open) return;

      let moved = { ...piece };

      if (e.key === "ArrowLeft") moved.x--;
      if (e.key === "ArrowRight") moved.x++;
      if (e.key === "ArrowDown") moved.y++;
      if (e.key === "ArrowUp") moved = rotatePiece(moved);

      if (!collide(moved)) piece = moved;
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, gameOver]);

  useEffect(() => {
    if (open) startGame();
  }, [open]);

  // -----------------------------------
  // Render Modal
  // -----------------------------------
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
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
              className="border border-gray-300 mx-auto mb-4 rounded-lg bg-black"
            />

            <p className="text-center text-lg font-medium mb-3">
              Score: {score}
            </p>

            {gameOver && (
              <div className="text-center">
                <p className="text-red-600 font-bold text-lg mb-3">
                  GAME OVER
                </p>
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
      )}
    </>
  );
}
