import React, { useEffect, useRef, useState } from "react";

export default function TetrisModal({ open, onClose }) {
  const canvasRef = useRef(null);

  // Game state refs (do NOT cause re-renders)
  const boardRef = useRef([]);
  const pieceRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dropCounterRef = useRef(0);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // ==== CONSTANTS ====
  const ROWS = 20;
  const COLS = 10;
  const BLOCK = 30;

  // Classic Tetris colors
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

  // ==== GAME LOGIC ====
  function resetBoard() {
    boardRef.current = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  function randomPiece() {
    const type = (Math.random() * 7 + 1) | 0;
    return {
      shape: shapes[type].map((r) => [...r]),
      x: 3,
      y: 0,
      type,
    };
  }

  function collide(p) {
    const board = boardRef.current;

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
  }

  function merge(p) {
    const board = boardRef.current;
    p.shape.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val !== 0) {
          board[p.y + r][p.x + c] = p.type;
        }
      });
    });
  }

  function clearLines() {
    let cleared = 0;
    const board = boardRef.current;

    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r].every((cell) => cell !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        cleared++;
        r++;
      }
    }
    if (cleared > 0) {
      setScore((s) => s + cleared * 100);
    }
  }

  function rotatePiece(p) {
    const rotated = p.shape[0].map((_, i) =>
      p.shape.map((row) => row[i]).reverse()
    );
    return { ...p, shape: rotated };
  }

  // ==== DRAWING ====
  function draw(ctx) {
    ctx.clearRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // ---- CENTER WATERMARK ----
    const logo = new Image();
    logo.src = "/logos/griffon_logo.svg";
    logo.onload = () => {
      const size = 120;
      ctx.globalAlpha = 0.12;
      ctx.drawImage(
        logo,
        COLS * BLOCK / 2 - size / 2,
        ROWS * BLOCK / 2 - size / 2,
        size,
        size
      );
      ctx.globalAlpha = 1;
    };

    // draw board
    boardRef.current.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val !== 0) {
          ctx.fillStyle = colors[val];
          ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK - 1, BLOCK - 1);
        }
      });
    });

    // draw active piece
    const p = pieceRef.current;
    p.shape.forEach((row, r) => {
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
      });
    });
  }

  // ==== LOOP ====
  function update(time = 0) {
    if (!open || gameOver) return;

    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    dropCounterRef.current += delta;

    if (dropCounterRef.current > 500) {
      pieceRef.current.y++;
      dropCounterRef.current = 0;

      if (collide(pieceRef.current)) {
        pieceRef.current.y--;
        merge(pieceRef.current);
        clearLines();
        pieceRef.current = randomPiece();

        if (collide(pieceRef.current)) {
          setGameOver(true);
          return;
        }
      }
    }

    const canvas = canvasRef.current;
    if (canvas) draw(canvas.getContext("2d"));

    requestAnimationFrame(update);
  }

  // ==== START GAME ====
  function startGame() {
    resetBoard();
    pieceRef.current = randomPiece();
    setScore(0);
    setGameOver(false);
    lastTimeRef.current = 0;
    dropCounterRef.current = 0;

    requestAnimationFrame(update);
  }

  // ==== KEYBOARD ====
  useEffect(() => {
    function handleKey(e) {
      if (!open || gameOver) return;

      const p = pieceRef.current;

      if (e.key === "ArrowLeft") {
        p.x--;
        if (collide(p)) p.x++;
      } else if (e.key === "ArrowRight") {
        p.x++;
        if (collide(p)) p.x--;
      } else if (e.key === "ArrowDown") {
        p.y++;
        if (collide(p)) p.y--;
      } else if (e.key === "ArrowUp") {
        const rotated = rotatePiece(p);
        if (!collide(rotated)) pieceRef.current = rotated;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, gameOver]);

  // ==== OPEN MODAL ====
  useEffect(() => {
    if (open) startGame();
  }, [open]);

  // ==== RENDER ====
  return open ? (
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
          className="border border-gray-300 mx-auto mb-3 rounded-lg bg-black"
        />

        <p className="text-center text-lg font-medium mb-4">Score: {score}</p>

        {gameOver && (
          <div className="text-center">
            <p className="text-red-600 font-bold text-lg mb-3">GAME OVER</p>
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
  ) : null;
}
