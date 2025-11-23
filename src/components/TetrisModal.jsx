import React, { useEffect, useRef, useState } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const renderRef = useRef(null);
  const gravityRef = useRef(null);
  const logo = useRef(null);

  const ROWS = 20;
  const COLS = 10;
  const BLOCK = 28;

  const colors = {
    1: "#00F0F0",
    2: "#0000F0",
    3: "#F0A000",
    4: "#F0F000",
    5: "#00F000",
    6: "#A000F0",
    7: "#F00000",
  };

  const shapes = {
    1: [[1, 1, 1, 1]],
    2: [
      [2, 0, 0],
      [2, 2, 2],
    ],
    3: [
      [0, 0, 3],
      [3, 3, 3],
    ],
    4: [
      [4, 4],
      [4, 4],
    ],
    5: [
      [0, 5, 5],
      [5, 5, 0],
    ],
    6: [
      [0, 6, 0],
      [6, 6, 6],
    ],
    7: [
      [7, 7, 0],
      [0, 7, 7],
    ],
  };

  let board = [];
  const piece = useRef(null);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const resetBoard = () => {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  };

  const randomPiece = () => {
    const type = Math.floor(Math.random() * 7) + 1;
    return {
      type,
      shape: shapes[type].map((r) => [...r]),
      x: 3,
      y: 0,
    };
  };

  const collide = (p) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        const value = p.shape[r][c];
        if (value !== 0) {
          const nx = p.x + c;
          const ny = p.y + r;

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
    p.shape.forEach((row, r) =>
      row.forEach((val, c) => {
        if (val !== 0) {
          board[p.y + r][p.x + c] = val;
        }
      })
    );
  };

  const rotate = (p) => {
    const rotated = p.shape[0].map((_, i) =>
      p.shape.map((row) => row[i]).reverse()
    );
    return { ...p, shape: rotated };
  };

  const getGhostPiece = () => {
    const g = JSON.parse(JSON.stringify(piece.current));
    while (!collide({ ...g, y: g.y + 1 })) g.y++;
    return g;
  };

  const clearLines = () => {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r].every((v) => v !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        cleared++;
        r++;
      }
    }
    if (cleared > 0) {
      setScore((s) => s + cleared * 100);
    }
  };

  const draw = (ctx) => {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // Draw board
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] !== 0) {
          ctx.fillStyle = colors[board[r][c]];
          ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK - 1, BLOCK - 1);
        }
      }
    }

    // Ghost piece (transparent)
    const ghost = getGhostPiece();
    ghost.shape.forEach((row, r) =>
      row.forEach((val, c) => {
        if (val !== 0) {
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.fillRect(
            (ghost.x + c) * BLOCK,
            (ghost.y + r) * BLOCK,
            BLOCK - 1,
            BLOCK - 1
          );
        }
      })
    );

    // Active piece
    const p = piece.current;
    p.shape.forEach((row, r) =>
      row.forEach((val, c) => {
        if (val !== 0) {
          ctx.fillStyle = colors[p.type];
          ctx.fillRect(
            (p.x + c) * BLOCK,
            (p.y + r) * BLOCK,
            BLOCK - 1,
            BLOCK - 1
          );
        }
      })
    );

    // Watermark logo
    if (logo.current?.complete) {
      ctx.globalAlpha = 0.18;
      const size = 60;
      ctx.drawImage(
        logo.current,
        COLS * BLOCK - size - 6,
        ROWS * BLOCK - size - 6,
        size,
        size
      );
      ctx.globalAlpha = 1;
    }
  };

  const gravity = () => {
    const newP = { ...piece.current, y: piece.current.y + 1 };

    if (collide(newP)) {
      piece.current.y--;
      merge(piece.current);
      clearLines();
      const next = randomPiece();

      if (collide(next)) {
        setGameOver(true);
        stopLoops();
        return;
      }
      piece.current = next;
    } else {
      piece.current = newP;
    }
  };

  const stopLoops = () => {
    cancelAnimationFrame(renderRef.current);
    clearInterval(gravityRef.current);
  };

  const startLoops = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = () => {
      draw(ctx);
      renderRef.current = requestAnimationFrame(render);
    };

    renderRef.current = requestAnimationFrame(render);

    gravityRef.current = setInterval(gravity, 450);
  };

  const handleKey = (e) => {
    if (gameOver) return;

    let p = JSON.parse(JSON.stringify(piece.current));

    if (e.key === "ArrowLeft") p.x--;
    if (e.key === "ArrowRight") p.x++;
    if (e.key === "ArrowDown") p.y++;
    if (e.key === "ArrowUp") p = rotate(p);

    if (e.key === " ") {
      while (!collide({ ...p, y: p.y + 1 })) p.y++;
    }

    if (!collide(p)) piece.current = p;
  };

  const startGame = () => {
    resetBoard();
    piece.current = randomPiece();
    setScore(0);
    setLevel(1);
    setGameOver(false);
    startLoops();
  };

  useEffect(() => {
    if (open) {
      logo.current = new Image();
      logo.current.src = "/logos/griffon_logo.svg";

      window.addEventListener("keydown", handleKey);
      startGame();
    } else {
      stopLoops();
      window.removeEventListener("keydown", handleKey);
    }

    return () => {
      stopLoops();
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    open && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-6 relative w-[460px]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>

          <h2 className="text-xl font-semibold text-center mb-2">
            Griffon Tetris
          </h2>

          <canvas
            ref={canvasRef}
            width={COLS * BLOCK}
            height={ROWS * BLOCK}
            className="mx-auto border border-gray-300 rounded bg-black"
          />

          <p className="text-center text-lg font-medium mt-3">
            Score: {score}
          </p>

          {gameOver && (
            <div className="text-center mt-4">
              <p className="text-red-600 font-bold text-lg mb-3">GAME OVER</p>
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
