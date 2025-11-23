import React, { useState, useEffect, useRef } from "react"

const ROWS = 20
const COLS = 10

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

const randomShape = () => {
  const keys = Object.keys(SHAPES)
  const r = keys[Math.floor(Math.random() * keys.length)]
  return { shape: SHAPES[r], type: r, x: 3, y: 0 }
}

const rotate = (matrix) => {
  const N = matrix.length
  const result = Array.from({ length: N }, () => Array(N).fill(0))
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      result[x][N - 1 - y] = matrix[y][x]
    }
  }
  return result
}

export default function TetrisGame() {
  const canvasRef = useRef(null)
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  )
  const [current, setCurrent] = useState(randomShape())
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [highScores, setHighScores] = useState(() => {
    return JSON.parse(localStorage.getItem("tetrisHighScores") || "[]")
  })

  const speeds = { 1: 800, 2: 500, 3: 300 }

  const collision = (p = current) => {
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (p.shape[y][x]) {
          const newX = p.x + x
          const newY = p.y + y
          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && board[newY][newX])
          ) {
            return true
          }
        }
      }
    }
    return false
  }

  const mergePiece = () => {
    const newBoard = board.map((r) => [...r])
    current.shape.forEach((row, dy) => {
      row.forEach((val, dx) => {
        if (val && current.y + dy >= 0) {
          newBoard[current.y + dy][current.x + dx] = current.type
        }
      })
    })
    setBoard(newBoard)
  }

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

    if (cleared) {
      setScore((s) => s + cleared * 100)
      if (score > 500) setLevel(2)
      if (score > 1200) setLevel(3)
    }

    setBoard(newBoard)
  }

  const drop = () => {
    const moved = { ...current, y: current.y + 1 }
    if (!collision(moved)) {
      setCurrent(moved)
    } else {
      mergePiece()
      clearLines()
      const next = randomShape()
      if (collision(next)) {
        setGameOver(true)
        saveScore()
      }
      setCurrent(next)
    }
  }

  const saveScore = () => {
    const list = [...highScores, score]
      .sort((a, b) => b - a)
      .slice(0, 10)
    setHighScores(list)
    localStorage.setItem("tetrisHighScores", JSON.stringify(list))
  }

  const handleKey = (e) => {
    if (gameOver) return
    if (e.key === "ArrowLeft") {
      const m = { ...current, x: current.x - 1 }
      if (!collision(m)) setCurrent(m)
    }
    if (e.key === "ArrowRight") {
      const m = { ...current, x: current.x + 1 }
      if (!collision(m)) setCurrent(m)
    }
    if (e.key === "ArrowDown") drop()
    if (e.key === "ArrowUp") {
      const r = { ...current, shape: rotate(current.shape) }
      if (!collision(r)) setCurrent(r)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) drop()
    }, speeds[level])
    return () => clearInterval(interval)
  }, [level, gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, 300, 600)

    board.forEach((row, y) =>
      row.forEach((val, x) => {
        if (val) {
          ctx.fillStyle = COLORS[val]
          ctx.fillRect(x * 30, y * 30, 30, 30)
        }
      })
    )

    current.shape.forEach((row, dy) =>
      row.forEach((val, dx) => {
        if (val) {
          ctx.fillStyle = COLORS[current.type]
          ctx.fillRect((current.x + dx) * 30, (current.y + dy) * 30, 30, 30)
        }
      })
    )
  }, [board, current])

  return (
    <div className="flex flex-col items-center">

      {gameOver && (
        <img src="/logos/griffon_logo.svg" className="opacity-40 w-40 mb-4" />
      )}

      <canvas
        ref={canvasRef}
        width={300}
        height={600}
        className="border-4 border-gray-800 bg-black shadow-xl"
      />

      <div className="text-white mt-4 text-center">
        <p className="text-xl font-bold">Score: {score}</p>
        <p className="text-md">Level: {level}</p>
      </div>

      {gameOver && (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2 bg-red-600 text-white rounded shadow"
        >
          Restart
        </button>
      )}

      <div className="mt-6 text-gray-200 w-64">
        <h2 className="text-lg font-bold text-center">High Scores</h2>
        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          {highScores.map((s, i) => (
            <p key={i} className="py-1 border-b border-gray-700">
              {i + 1}. {s}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
