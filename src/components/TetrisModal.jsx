import React, { useState, useEffect, useRef } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [piece, setPiece] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("tetrisHighScore") || 0)
  );
  const [state, setState] = useState("intro"); // intro | playing | gameover | paused

  const ROWS = 20;
  const COLS = 10;
  const BLOCK = 30;

  const GRIFFON_LOGO = "/logos/griffon_logo.svg";

  const COLORS = {
    I: "#42a5f5",
    O: "#ffeb3b",
    T: "#ab47bc",
    S: "#66bb6a",
    Z: "#ef5350",
    J: "#5c6bc0",
    L: "#ffa726",
  };

  const SHAPES = {
    I: [[1, 1, 1, 1]],
    O: [
      [1, 1],
      [1, 1],
    ],
    T: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    J: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    L: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  };

  const randomPiece = () => {
    const keys = Object.keys(SHAPES);
    const type = keys[Math.floor(Math.random() * keys.length)];
    return {
      type,
      shape: SHAPES[type],
      row: 0,
      col: Math.floor(COLS / 2) - 1,
    };
  };

  const initGrid = () => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  };

  const rotate = (shape) =>
    shape[0].map((_, i) => shape.map((r) => r[i]).reverse());

  const collide = (p, g) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[0].length; c++) {
        if (
          p.shape[r][c] &&
          (g[p.row + r] === undefined ||
            g[p.row + r][p.col + c] === undefined ||
            g[p.row + r][p.col + c])
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const merge = (p, g) => {
    const newGrid = g.map((row) => [...row]);
    p.shape.forEach((r, i) => {
      r.forEach((v, j) => {
        if (v) newGrid[p.row + i][p.col + j] = p.type;
      });
    });
    return newGrid;
  };

  const clearLines = (g) => {
    let cleared = 0;
    const newGrid = g.filter((row) => {
      if (row.every((v) => v)) {
        cleared++;
        return false;
      }
      return true;
    });

    while (newGrid.length < ROWS) newGrid.unshift(Array(COLS).fill(null));
    if (cleared > 0) setScore((s) => s + cleared * 100);
    return newGrid;
  };

  // ---- Game Loop ----
  useEffect(() => {
    if (!open) return;

    if (state === "playing" && !intervalId) {
      const id = setInterval(() => {
        moveDown();
      }, 500);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [open, state]);

  useEffect(() => {
    if (open) {
      setGrid(initGrid());
      setPiece(randomPiece());
    }
  }, [open]);

  const moveDown = () => {
    if (state !== "playing") return;

    const newPiece = { ...piece, row: piece.row + 1 };
    if (collide(newPiece, grid)) {
      const merged = merge(piece, grid);
      const cleared = clearLines(merged);
      setGrid(cleared);

      const next = randomPiece();
      if (collide(next, cleared)) {
        setState("gameover");
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem("tetrisHighScore", score);
        }
      } else {
        setPiece(next);
      }
      return;
    }
    setPiece(newPiece);
  };

  const move = (dir) => {
    if (state !== "playing") return;

    const newPiece = { ...piece, col: piece.col + dir };
    if (!collide(newPiece, grid)) setPiece(newPiece);
  };

  const rotatePiece = () => {
    if (state !== "playing") return;
    const rotated = { ...piece, shape: rotate(piece.shape) };
    if (!collide(rotated, grid)) setPiece(rotated);
  };

  const startPlaying = () => {
    setScore(0);
    setPiece(randomPiece());
    setGrid(initGrid());
    setState("playing");
  };

  // ---- Rendering ----
  useEffect(() => {
    if (!canvasRef.current || !open) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // Draw grid
    grid.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v) {
          ctx.fillStyle = COLORS[v];
          ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
        }
      })
    );

    // Draw piece
    piece?.shape.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v) {
          ctx.fillStyle = COLORS[piece.type];
          ctx.fillRect(
            (piece.col + c) * BLOCK,
            (piece.row + r) * BLOCK,
            BLOCK,
            BLOCK
          );
        }
      })
    );
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 text-2xl"
        >
          ✕
        </button>

        {/* ---- INTRO SCREEN ---- */}
        {state === "intro" && (
          <div className="text-center">
            <img
              src={GRIFFON_LOGO}
              alt="Griffon"
              className="w-24 mx-auto mb-4 opacity-90"
            />
            <h2 className="text-2xl font-semibold mb-3">Griffon Tetris</h2>
            <p className="text-gray-600 mb-6">
              A quick game while you wait for your next deployment.
            </p>
            <button
              onClick={startPlaying}
              className="bg-black text-white px-6 py-3 rounded-xl text-lg"
            >
              Start Game
            </button>
          </div>
        )}

        {/* ---- GAME OVER ---- */}
        {state === "gameover" && (
          <div className="text-center">
            <img
              src={GRIFFON_LOGO}
              alt="Griffon"
              className="w-24 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-3">Game Over</h2>
            <p className="mb-2 text-lg">Score: {score}</p>
            <p className="mb-6 text-gray-700">High Score: {highScore}</p>
            <button
              onClick={startPlaying}
              className="bg-black text-white px-6 py-3 rounded-xl text-lg"
            >
              Play Again
            </button>
          </div>
        )}

        {/* ---- GAME DISPLAY ---- */}
        {(state === "playing" || state === "paused") && (
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={COLS * BLOCK}
              height={ROWS * BLOCK}
              className="border border-gray-300 rounded"
            />

            <div className="flex justify-between w-full mt-4">
              <p className="text-lg">Score: {score}</p>
              <p className="text-lg">High Score: {highScore}</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => move(-1)}
              >
                ◀
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={rotatePiece}
              >
                ⟳
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => move(1)}
              >
                ▶
              </button>
            </div>

            <button
              onClick={() =>
                setState(state === "paused" ? "playing" : "paused")
              }
              className="mt-4 text-sm underline"
            >
              {state === "paused" ? "Resume" : "Pause"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
