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
  const DROP_SPEED = 550; // slower so it plays like real Tetris

  // Tetromino colors
  const colors = [
    null,
    "#00f0f0", // I
    "#0000f0", // J
    "#f0a000", // L
    "#f0f000", // O
    "#00f000", // S
    "#a000f0", // T
    "#f00000", // Z
  ];

  // Tetromino shapes
  const shapes = [
    [],
    [[1, 1, 1, 1]], // I
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

  // ----- PRELOAD GRIFFON LOGO -----
  useEffect(() => {
    const img = new Image();
    img.src = "/logos/griffon_logo.svg";
    img.onload = () => {
      logoRef.current = img;
    };
  }, []);

  // ----- CREATE RANDOM PIECE -----
  const randomPiece = () => {
    const type = Math.floor(Math.random() * 7) + 1;
    return {
      shape: shapes[type].map((row) => [...row]),
      x: 3,
      y: 0,
      type,
    };
  };

  // ----- COLLISION CHECK -----
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

  // ----- MERGE PIECE INTO BOARD -----
  const merge = (p) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c] !== 0) {
          board[p.y + r][p.x + c] = p.type;
        }
      }
    }
  };

  // ----- ROTATE -----
  const rotatePiece = () => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map((row) => row[i]).reverse()
    );
    const testPiece = { ...piece, shape: rotated };

    if (!collide(testPiece)) {
      piece.shape = rotated;
    }
  };

  // ----- MOVE LEFT / RIGHT -----
  const movePiece = (dir) => {
    const testPiece = { ...piece, x: piece.x + dir };
    if (!collide(testPiece)) {
      piece.x += dir;
    }
  };

  // ----- HARD DROP -----
  const dropFast = () => {
    while (!collide({ ...piece, y: piece.y + 1 })) {
      piece.y++;
    }
  };

  // ----- CLEAR LINES -----
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

  // ----- DRAW EVERYTHING -----
  const draw = (ctx) => {
    ctx.clearRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // board background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

    // draw board blocks
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] !== 0) {
          ctx.fillStyle = colors[board[r][c]];
          ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK - 1, BLOCK - 1);
        }
      }
    }

    // draw active piece
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

    // ----- CENTERED GRIFFON WATERMARK -----
    if (logoRef.current) {
      const size = 90;
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.drawImage(
        logoRef.current,
        COLS * BLOCK / 2 - size / 2,
        ROWS * BLOCK / 2 - size / 2,
        size,
        size
      );
      ctx.restore();
    }
  };

  // ----- GAME LOOP -----
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

  // ----- START GAME -----
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

  // ----- KEYBOARD CONTROLS -----
  useEffect(() => {
    const handleKey = (e) => {
      if (!open || gameOver) return;

      if (e.key === "ArrowLeft") movePiece(-1);
      if (e.key === "ArrowRight") movePiece(1);
      if (e.key === "ArrowUp") rotatePiece();
      if (e.key === "ArrowDown") piece.y++;
      if (e.key === " ") dropFast();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, gameOver]);

  // ----- OPEN MODAL → START GAME -----
  useEffect(() => {
    if (open) startGame();
  }, [open]);

  return (
    open && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-6 relative w-[420px]">
          {/* Close */}
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

          <p className="text-center text-lg mb-4 font-medium">
            Score: {score}
          </p>

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
    )
  );
}
