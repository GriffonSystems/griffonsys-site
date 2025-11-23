import React, { useState, useEffect, useRef } from "react"

// Board size
const COLS = 10
const ROWS = 20
const BLOCK = 30

// Tetromino shapes
const SHAPES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
}

// Colors for each block type
const COLORS = {
  I: "#00ffff",
  J: "#0000ff",
  L: "#ff9900",
  O: "#ffff00",
  S: "#00ff00",
  Z: "#ff0000",
  T: "#9900ff",
}

// Generate new empty board
const emptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0))

// Random tetromino
const randomPiece = () => {
  const types = Object.keys(SHAPES)
  const type = types[Math.floor(Math.random() * types.length)]
  return {
    x: 3,
    y: -1,
    shape: SHAPES[type],
    type,
  }
}

// Rotate matrix 90°
const rotateMatrix = (m) =>
  m[0].map((_, i) => m.map((row) => row[i])).reverse()

export default function TetrisGame() {
  const canvasRef = useRef(null)
  const [board, setBoard] = useState(emptyBoard())
  const [piece, setPiece] = useState(randomPiece())
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  const speeds = { 1: 600, 2: 450, 3: 300, 4: 200, 5: 120 }

  // Collision detection
  const collides = (p, b = board) => {
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (p.shape[y][x]) {
          const newY = p.y + y
          const newX = p.x + x
          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && b[newY][newX])
          ) {
            return true
          }
        }
      }
    }
    return false
  }

  // Merge piece into board
  const merge = (p) => {
    const newBoard = board.map((r) => [...r])
    p.shape.forEach((row, dy) => {
      row.forEach((val, dx) => {
        if (val) {
          const y = p.y + dy
          const x = p.x + dx
          if (y >= 0) newBoard[y][x] = p.type
        }
      })
    })
    setBoard(newBoard)
  }

  // Clear lines
  const clearLines = () => {
    let cleared = 0
    const newBoard = board.filter((row) => {
      if (row.every((c) => c)) {
        cleared++
        return false
      }
      return true
    })
    while (newBoard.length < ROWS) newBoard.unshift(Array(COLS).fill(0))
    if (cleared > 0) {
      setScore((s) => s + cleared * 100)
      if (score > 400) setLevel(2)
      if (score > 800) setLevel(3)
      if (score > 1500) setLevel(4)
    }
    setBoard(newBoard)
  }

  // Drop piece
  const drop = () => {
    const next = { ...piece, y: piece.y + 1 }
    if (!collides(next)) {
      setPiece(next)
    } else {
      merge(piece)
      clearLines()
      const nextPiece = randomPiece()
      if (collides(nextPiece)) {
        setGameOver(true)
      }
      setPiece(nextPiece)
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (gameOver) return

      if (e.key === "ArrowLeft") {
        const next = { ...piece, x: piece.x - 1 }
        if (!collides(next)) setPiece(next)
      }

      if (e.key === "ArrowRight") {
        const next = { ...piece, x: piece.x + 1 }
        if (!collides(next)) setPiece(next)
      }

      if (e.key === "ArrowDown") drop()

      if (e.key === "ArrowUp") {
        const rotated = {
          ...piece,
          shape: rotateMatrix(piece.shape),
        }
        if (!collides(rotated)) setPiece(rotated)
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [piece, gameOver])

  // Drop loop
  useEffect(() => {
    if (gameOver) return
    const id = setInterval(drop, speeds[level])
    return () => clearInterval(id)
  }, [piece, level, gameOver])

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK)

    // Draw board
    board.forEach((row, y) =>
      row.forEach((val, x) => {
        if (val) {
          ctx.fillStyle = COLORS[val]
          ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK)
        }
      })
    )

    // Draw falling piece
    piece.shape.forEach((row, dy) =>
      row.forEach((val, dx) => {
        if (val) {
          ctx.fillStyle = COLORS[piece.type]
          ctx.fillRect((piece.x + dx) * BLOCK, (piece.y + dy) * BLOCK, BLOCK, BLOCK)
        }
      })
    )
  }, [board, piece])

  return (
    <div className="flex flex-col items-center">

      {gameOver && (
        <img src="/logos/griffon_logo.svg" className="w-40 opacity-40 mb-4" />
      )}

      <canvas
        ref={canvasRef}
        width={COLS * BLOCK}
        height={ROWS * BLOCK}
        className="border-4 border-gray-700 bg-black"
      />

      <div className="text-white text-center mt-4">
        <p className="text-xl font-bold">Score: {score}</p>
        <p className="text-md">Level: {level}</p>
      </div>
    </div>
  )
}
