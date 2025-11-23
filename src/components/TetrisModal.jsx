```jsx
import React, { useEffect, useRef, useState } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const loopRef = useRef(null);
  const gravityRef = useRef(null);
  const logoRef = useRef(null);
  const pieceRef = useRef(null);

  const ROWS = 20;
  const COLS = 10;
  const BLOCK = 28;

  // Griffon-themed palette
  const colors = {
    1: "#00F0F0", // I piece
    2: "#0000F0", // J
    3: "#F0A000", // L
    4: "#F0F000", // O
    5: "#00F000", // S
    6: "#A000F0", // T
    7: "#F00000", // Z
  };

  const ghostColor = "rgba(255,255,255,0.25)";

  // Shapes
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

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
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
        if (p.shape[r][c] !== 0) {
          let nx = p.x + c;
          let ny = p.y + r;
          if (
            nx < 0 ||
            nx >= COLS ||
            ny >= ROWS ||
            (ny >= 0 && board[ny][nx] !== 0)
          )
            return true;
        }
      }
    }
    return false;
  };

  const merge = (p) => {
    p.shape.forEach((row, r) =>
      row.forEach((val, c) => {
        if (val !== 0) board[p.y + r][p.x + c] = val;
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
    let ghost = JSON.parse(JSON.stringify(pieceRef.current));
    while (!collide({ ...ghost, y: ghost.y + 1 })) ghost.y++;
    return ghost;
  };

  const clearLines = () => {
    let count = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r].every((v) => v !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        count++;
        r++;
      }
    }

    if (count > 0) {
      setLines((l) => l + count);
      const points = [0, 40, 100, 300, 1200][count];
      setScore((s) => s + points * level);

      if ((lines + count) % 10 === 0) {
        setLevel((lvl) => lvl + 1);
        restartGravity();
      }
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

    // Ghost piece
    const ghost = getGhostPiece();
    ghost.shape.forEach((row, r) =>
      row.forEach((val, c) => {
        if (val !== 0) {
          ctx.fillStyle = ghostColor;
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
    const p = pieceRef.current;
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

    // Logo watermark
    if (logoRef.current.complete) {
      ctx.globalAlpha = 0.18;
      const size = 65;
      ctx.drawImage(
        logoRef.current,
        COLS * BLOCK - size - 5,
        ROWS * BLOCK - size - 5,
        size,
        size
      );
      ctx.globalAlpha = 1.0;
    }
  };

  const gravityStep = () => {
    const p = { ...pieceRef.current, y: pieceRef.current.y + 1 };

    if (collide(p)) {
      merge(pieceRef.current);
      clearLines();
      const newP = randomPiece();
      if (collide(newP)) {
        setGameOver(true);
        stopLoops();
        return;
      }
      pieceRef.current = newP;
    } else {
      pieceRef.current = p;
    }
  };

  const startLoops = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const renderLoop = () => {
      draw(ctx);
      loopRef.current = requestAnimationFrame(renderLoop);
    };

    loopRef.current = requestAnimationFrame(renderLoop);
    restartGravity();
  };

  const restartGravity = () => {
    clearInterval(gravityRef.current);
    gravityRef.current = setInterval(gravityStep, Math.max(80, 600 - level * 40));
  };

  const stopLoops = () => {
    cancelAnimationFrame(loopRef.current);
    clearInterval(gravityRef.current);
  };

  const handleKey = (e) => {
    if (gameOver) return;

    let p = JSON.parse(JSON.stringify(pieceRef.current));

    if (e.key === "ArrowLeft") p.x--;
    if (e.key === "ArrowRight") p.x++;
    if (e.key === "ArrowDown") p.y++;
    if (e.key === "ArrowUp") p = rotate(p);

    // Hard drop
    if (e.key === " ") {
      while (!collide({ ...p, y: p.y + 1 })) p.y++;
    }

    if (!collide(p)) pieceRef.current = p;
  };

  const startGame = () => {
    resetBoard();
    pieceRef.current = randomPiece();

    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);

    startLoops();
  };

  // Modal open / close behavior
  useEffect(() => {
    if (open) {
      logoRef.current = new Image();
      logoRef.current.src = "/logos/griffon_logo.svg";

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
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl relative w-[480px]">

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-center mb-3">
              Griffon Tetris
            </h2>

            <canvas
              ref={canvasRef}
              width={COLS * BLOCK}
              height={ROWS * BLOCK}
              className="mx-auto rounded-lg border border-gray-300 bg-black"
            />

            <div className="text-center mt-3">
              <p className="text-lg font-semibold">Score: {score}</p>
              <p className="text-sm text-gray-600">Level: {level}</p>
              <p className="text-sm text-gray-600 mb-3">Lines: {lines}</p>
            </div>

            {gameOver && (
              <div className="text-center mt-4">
                <p className="text-red-600 font-bold text-lg mb-2">GAME OVER</p>

                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
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
