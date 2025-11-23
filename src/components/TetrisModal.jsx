import React, { useEffect, useRef, useState } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const ROWS = 20;
  const COLS = 10;
  const BLOCK = 30;

  const DROP_SPEED = 350; // faster default drop
  const FAST_DROP = 90; // soft drop speed

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
    [[7, 7, 7], [0, 7, 0]],
  ];

  let piece = null;
  let board = [];
  let droppingFast = false;

  // ----------------------------
  // Reset & Piece Logic
  // ----------------------------
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
          const nx = p.x + c;
          const ny = p.y + r;

          if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
          if (ny >= 0 && board[ny][nx] !== 0) return true;
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

  const rotate = (p) => {
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
    if (cleared > 0) {
      const newScore = score + cleared * 150;
      setScore(newScore);

      // update best score
      if (newScore > best) {
        setBest(newScore);
        localStorage.setItem("griffon_tetris_best", newScore);
      }
    }
  };

  // ----------------------------
  // Draw Board + Logo
  // ----------------------------
  const draw = (ctx, logo) => {
    ctx.clearRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    ctx.fillStyle = "#0c0c0c";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] !== 0) {
          ctx.fillStyle = colors[board[r][c]];
          ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK - 1, BLOCK - 1);
        }
      }
    }

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

    // Soft centered logo
    if (logo.complete) {
      ctx.globalAlpha = 0.22;
      const size = 100;
      const cx = (COLS * BLOCK - size) / 2;
      const cy = (ROWS * BLOCK - size) / 2;
      ctx.drawImage(logo, cx, cy, size, size);
      ctx.globalAlpha = 1;
    }
  };

  // ----------------------------
  // Game Loop
  // ----------------------------
  const loop = (ctx, logo) => {
    if (!open) return;

    piece.y++;

    if (collide(piece)) {
      piece.y--;

      merge(piece);
      clearLines();
      piece = randomPiece();

      // protect first spawn
      if (collide(piece)) {
        setGameOver(true);
        return;
      }
    }

    draw(ctx, logo);

    setTimeout(
      () => requestAnimationFrame(() => loop(ctx, logo)),
      droppingFast ? FAST_DROP : DROP_SPEED
    );
  };

  const startGame = () => {
    const bestStored = parseInt(localStorage.getItem("griffon_tetris_best"));
    if (!isNaN(bestStored)) setBest(bestStored);

    resetBoard();
    setScore(0);
    setGameOver(false);
    piece = randomPiece();
    droppingFast = false;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const logo = new Image();
    logo.src = "/logos/griffon_logo.svg";

    requestAnimationFrame(() => loop(ctx, logo));
  };

  // ----------------------------
  // Start on open
  // ----------------------------
  useEffect(() => {
    if (open) startGame();
  }, [open]);

  // ----------------------------
  // Controls
  // ----------------------------
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (gameOver) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let newPiece = {
        ...piece,
        shape: piece.shape.map((r) => [...r]),
      };

      if (e.key === "ArrowLeft") newPiece.x--;
      if (e.key === "ArrowRight") newPiece.x++;
      if (e.key === "ArrowUp") newPiece = rotate(newPiece);
      if (e.key === "ArrowDown") droppingFast = true;

      if (!collide(newPiece)) piece = newPiece;

      draw(ctx, new Image());
    };

    const handleUp = (e) => {
      if (e.key === "ArrowDown") droppingFast = false;
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleUp);
    };
  }, [open, gameOver]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 relative w-[420px]">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-3 text-center">
              Griffon Tetris
            </h2>

            <canvas
              ref={canvasRef}
              width={COLS * BLOCK}
              height={ROWS * BLOCK}
              className="border border-gray-300 mx-auto mb-3 rounded-lg bg-black"
            />

            <p className="text-center text-lg font-medium mb-1">
              Score: {score}
            </p>

            <p className="text-center text-sm text-gray-500 -mt-1 mb-3">
              Best: {best}
            </p>

            {gameOver && (
              <div className="text-center mt-3">
                <p className="text-red-600 font-bold text-lg mb-3">
                  GAME OVER
                </p>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  onClick={startGame}
                >
                  Restart Game
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
