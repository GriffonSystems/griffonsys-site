import React, { useEffect, useRef, useState } from "react"

const COLS = 10
const ROWS = 20
const BLOCK = 30

// Piece shapes
const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
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
}

const COLORS = {
  I: "#00f0f0",
  O: "#f0f000",
  T: "#a000f0",
  S: "#00f000",
  Z: "#f00000",
  J: "#0000f0",
  L: "#f0a000",
}

const newBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0))

const randomPiece = () => {
  const keys = Object.keys(SHAPES)
  const type = keys[(keys.length * Math.random()) | 0]
  return {
    x: 3,
    y: -2,
    type,
    shape: SHAPES[type],
  }
}

export default function TetrisGame() {
  const canvasRef = useRef(null)
  const [board, setBoard] = useState(newBoard())
  const [piece, setPiece] = useState(randomPiece())
  const [gameOver, setGameOver] = useState(false)

  const speed = 400 // FAST drop

  const collide = (p, b = board) => {
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (p.shape[y][x]) {
          const ny = p.y + y
          const nx = p.x + x
          if (nx < 0 || nx >= COLS || ny >= ROWS || (ny >= 0 && b[ny][nx])) {
            return true
          }
        }
      }
    }
    return false
  }

  const merge = (p) => {
    const newB = board.map((row) => [...row])
    p.shape.forEach((row, dy) =>
      row.forEach((val, dx) => {
        if (val) {
          const y = p.y + dy
          const x = p.x + dx
          if (y >= 0) newB[y][x] = p.type
        }
      })
    )
    setBoard(newB)
  }

  const rotate = (shape) => {
    const N = shape.length
    const res = Array.from({ length: N }, () => Array(N).fill(0))
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++)
        res[x][N - 1 - y] = shape[y][x]
    return res
  }

  const drop = () => {
    if (gameOver) return

    const next = { ...piece, y: piece.y + 1 }
    if (!collide(next)) {
      setPiece(next)
    } else {
      merge(piece)
      const nextPiece = randomPiece()
      if (collide(nextPiece)) {
        setGameOver(true)
      }
      setPiece(nextPiece)
    }
  }

  // Input
  useEffect(() => {
    const handle = (e) => {
      if (gameOver) return
      if (!piece) return

      if (e.key === "ArrowLeft") {
        const next = { ...piece, x: piece.x - 1 }
        if (!collide(next)) setPiece(next)
      }
      if (e.key === "ArrowRight") {
        const next = { ...piece, x: piece.x + 1 }
        if (!collide(next)) setPiece(next)
      }
      if (e.key === "ArrowDown") drop()
      if (e.key === "ArrowUp") {
        const next = { ...piece, shape: rotate(piece.shape) }
        if (!collide(next)) setPiece(next)
      }
    }

    window.addEventListener("keydown", handle)
    return () => window.removeEventListener("keydown", handle)
  }, [piece, gameOver])

  // Main loop (drop)
  useEffect(() => {
    if (gameOver) return
    const id = setInterval(drop, speed)
    return () => clearInterval(id)
  }, [piece, gameOver])

  // Draw
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
    if (piece) {
      ctx.fillStyle = COLORS[piece.type]
      piece.shape.forEach((row, dy) =>
        row.forEach((val, dx) => {
          if (val) {
            ctx.fillRect(
              (piece.x + dx) * BLOCK,
              (piece.y + dy) * BLOCK,
              BLOCK,
              BLOCK
            )
          }
        })
      )
    }
  }, [board, piece])

  return (
    <div className="flex flex-col items-center">
      {gameOver && (
        <div className="absolute top-6 opacity-40">
          <img src="/logos/griffon_logo.svg" className="w-40" />
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={COLS * BLOCK}
        height={ROWS * BLOCK}
        className="border-4 border-gray-700 bg-black"
      />
    </div>
  )
}
