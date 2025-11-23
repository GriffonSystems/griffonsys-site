import React, { useEffect, useRef, useState } from "react"

/* ============================================================
   CONSTANTS
   ============================================================ */

const COLS = 10
const ROWS = 20
const BLOCK = 30     // You chose Option A (30px blocks)

const COLORS = {
  I: "#00ffff",
  J: "#0000ff",
  L: "#ff9900",
  O: "#ffff00",
  S: "#00ff00",
  Z: "#ff0000",
  T: "#9900ff",
}

const SHAPES = {
  I: [
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
  ],
  J: [
    [[1,0,0],[1,1,1],[0,0,0]],
    [[0,1,1],[0,1,0],[0,1,0]],
    [[0,0,0],[1,1,1],[0,0,1]],
    [[0,1,0],[0,1,0],[1,1,0]],
  ],
  L: [
    [[0,0,1],[1,1,1],[0,0,0]],
    [[0,1,0],[0,1,0],[0,1,1]],
    [[0,0,0],[1,1,1],[1,0,0]],
    [[1,1,0],[0,1,0],[0,1,0]],
  ],
  O: [
    [[1,1],[1,1]],
    [[1,1],[1,1]],
    [[1,1],[1,1]],
    [[1,1],[1,1]],
  ],
  S: [
    [[0,1,1],[1,1,0],[0,0,0]],
    [[0,1,0],[0,1,1],[0,0,1]],
    [[0,0,0],[0,1,1],[1,1,0]],
    [[1,0,0],[1,1,0],[0,1,0]],
  ],
  Z: [
    [[1,1,0],[0,1,1],[0,0,0]],
    [[0,0,1],[0,1,1],[0,1,0]],
    [[0,0,0],[1,1,0],[0,1,1]],
    [[0,1,0],[1,1,0],[1,0,0]],
  ],
  T: [
    [[0,1,0],[1,1,1],[0,0,0]],
    [[0,1,0],[0,1,1],[0,1,0]],
    [[0,0,0],[1,1,1],[0,1,0]],
    [[0,1,0],[1,1,0],[0,1,0]],
  ],
}

/* ============================================================
   WALL KICKS — SRS STANDARD
   ============================================================ */

const JLSTZ_KICKS = {
  "0>1": [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  "1>0": [[0,0],[1,0],[1,-1],[0,2],[1,2]],

  "1>2": [[0,0],[1,0],[1,-1],[0,2],[1,2]],
  "2>1": [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],

  "2>3": [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  "3>2": [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],

  "3>0": [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
  "0>3": [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
}

const I_KICKS = {
  "0>1": [[0,0],[-2,0],[1,0],[-2,-1],[1,2]],
  "1>0": [[0,0],[2,0],[-1,0],[2,1],[-1,-2]],

  "1>2": [[0,0],[-1,0],[2,0],[-1,2],[2,-1]],
  "2>1": [[0,0],[1,0],[-2,0],[1,-2],[-2,1]],

  "2>3": [[0,0],[2,0],[-1,0],[2,1],[-1,-2]],
  "3>2": [[0,0],[-2,0],[1,0],[-2,-1],[1,2]],

  "3>0": [[0,0],[1,0],[-2,0],[1,-2],[-2,1]],
  "0>3": [[0,0],[-1,0],[2,0],[-1,2],[2,-1]],
}

/* ============================================================
   HELPERS
   ============================================================ */

const emptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0))

const randomPiece = () => {
  const keys = Object.keys(SHAPES)
  const type = keys[Math.floor(Math.random() * keys.length)]
  return { type, x: 3, y: -1, rot: 0 }
}

const getShape = (piece) =>
  SHAPES[piece.type][piece.rot]

const collision = (board, piece) => {
  const shape = getShape(piece)
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (!shape[y][x]) continue

      const bx = piece.x + x
      const by = piece.y + y

      if (bx < 0 || bx >= COLS || by >= ROWS) return true
      if (by >= 0 && board[by][bx]) return true
    }
  }
  return false
}

/* ============================================================
   COMPONENT — FULL SRS TETRIS
   ============================================================ */

export default function TetrisGame() {
  const canvasRef = useRef(null)

  const [board, setBoard] = useState(emptyBoard())
  const [piece, setPiece] = useState(randomPiece())
  const [next, setNext] = useState(randomPiece())
  const [gameOver, setGameOver] = useState(false)

  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  const speed = { 1: 600, 2: 450, 3: 300, 4: 200, 5: 120 }

  /* ============================================================
     ROTATION WITH SRS WALL KICKS
     ============================================================ */

  const tryRotate = () => {
    const newRot = (piece.rot + 1) % 4
    const testPiece = { ...piece, rot: newRot }
    const key = `${piece.rot}>${newRot}`

    const kicks =
      piece.type === "I" ? I_KICKS[key] : JLSTZ_KICKS[key]

    for (const [kx, ky] of kicks) {
      const moved = {
        ...testPiece,
        x: piece.x + kx,
        y: piece.y + ky,
      }
      if (!collision(board, moved)) {
        setPiece(moved)
        return
      }
    }
  }

  /* ============================================================
     MOVE PIECE DOWN
     ============================================================ */

  const drop = () => {
    const moved = { ...piece, y: piece.y + 1 }
    if (!collision(board, moved)) {
      setPiece(moved)
    } else {
      // lock piece
      const newBoard = board.map((r) => [...r])
      const shape = getShape(piece)

      shape.forEach((row, dy) =>
        row.forEach((val, dx) => {
          if (val) {
            const y = piece.y + dy
            const x = piece.x + dx
            if (y < 0) {
              setGameOver(true)
            } else {
              newBoard[y][x] = piece.type
            }
          }
        })
      )

      // clear lines
      let cleared = 0
      const filtered = newBoard.filter((r) => {
        if (r.every((c) => c)) {
          cleared++
          return false
        }
        return true
      })
      while (filtered.length < ROWS)
        filtered.unshift(Array(COLS).fill(0))

      if (cleared > 0) {
        setScore((s) => s + cleared * 150)
        if (score > 400) setLevel(2)
        if (score > 900) setLevel(3)
        if (score > 1600) setLevel(4)
      }

      setBoard(filtered)
      setPiece(next)
      setNext(randomPiece())
    }
  }

  /* ============================================================
     INPUT
     ============================================================ */

  useEffect(() => {
    const handler = (e) => {
      if (gameOver) return

      if (e.key === "ArrowLeft") {
        const moved = { ...piece, x: piece.x - 1 }
        if (!collision(board, moved)) setPiece(moved)
      }

      if (e.key === "ArrowRight") {
        const moved = { ...piece, x: piece.x + 1 }
        if (!collision(board, moved)) setPiece(moved)
      }

      if (e.key === "ArrowDown") drop()
      if (e.key === "ArrowUp") tryRotate()
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [piece, board, gameOver])

  /* ============================================================
     DROP LOOP
     ============================================================ */

  useEffect(() => {
    if (gameOver) return
    const id = setInterval(drop, speed[level])
    return () => clearInterval(id)
  }, [piece, level, gameOver])

  /* ============================================================
     DRAW CANVAS
     ============================================================ */

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, COLS * BLOCK, ROWS * BLOCK)

    // draw board
    board.forEach((row, y) =>
      row.forEach((val, x) => {
        if (val) {
          ctx.fillStyle = COLORS[val]
          ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK)
        }
      })
    )

    // draw piece
    const shape = getShape(piece)
    ctx.fillStyle = COLORS[piece.type]
    shape.forEach((row, dy) =>
      row.forEach((val, dx) => {
        if (val) {
          const x = (piece.x + dx) * BLOCK
          const y = (piece.y + dy) * BLOCK
          ctx.fillRect(x, y, BLOCK, BLOCK)
        }
      })
    )
  }, [board, piece])

  /* ============================================================
     RENDER — ARCADE PANEL (Option 3)
     ============================================================ */

  const nextShape = getShape(next)

  return (
    <div className="flex gap-6 items-start">

      {/* GAME BOARD */}
      <canvas
        ref={canvasRef}
        width={COLS * BLOCK}
        height={ROWS * BLOCK}
        className="border-4 border-gray-700 bg-black"
      />

      {/* RIGHT PANEL */}
      <div className="flex flex-col text-white gap-6 w-48">

        <div>
          <h2 className="text-xl font-bold mb-2">Next Piece</h2>
          <div className="bg-gray-900 border border-gray-700 p-4 rounded">
            <svg width="100" height="100">
              {nextShape.map((row, y) =>
                row.map((val, x) =>
                  val ? (
                    <rect
                      key={`${x},${y}`}
                      x={x * 20}
                      y={y * 20}
                      width="20"
                      height="20"
                      fill={COLORS[next.type]}
                    />
                  ) : null
                )
              )}
            </svg>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Stats</h2>
          <div className="bg-gray-900 border border-gray-700 p-4 rounded">
            <p className="mb-2">Score: {score}</p>
            <p>Level: {level}</p>
          </div>
        </div>

        {gameOver && (
          <div className="text-center mt-4">
            <img
              src="/logos/griffon_logo.svg"
              className="w-28 opacity-40 mx-auto mb-2"
            />
            <p className="text-red-400 text-xl font-bold">GAME OVER</p>
          </div>
        )}
      </div>
    </div>
  )
}
