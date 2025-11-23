import React, { useState, useEffect, useRef } from "react"

const ROWS = 20
const COLS = 10

// ----------- SHAPES -----------
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

// ---------- HELPERS ----------
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

function Tetris() {
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

  const dropSpeeds = {
    1: 800,
    2: 500,
    3: 300,
  }

  // ---------- COLLISION ----------
  const collision = (newPiece = current) => {
    for (let y = 0; y < newPiece.shape.length; y++) {
      for (let x = 0; x < newPiece.shape[y].length; x++) {
        if (newPiece.shape[y][x]) {
          const newX = newPiece.x + x
          const newY = newPiece.y + y
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

  // ----------- MERGE PIECE INTO BOARD -----------
  const mergePiece = () => {
    const newBoard = board.map((row) => [...row])
    current.shape.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val && current.y + y >= 0) {
          newBoard[current.y + y][current.x + x] = current.type
        }
      })
    })
    setBoard(newBoard)
  }

  // ---------- CLEAR LINES ----------
  const clearLines = () => {
    let cleared = 0
    const newBoard = board.filter((row) => {
      if (row.every((cell) => cell)) {
        cleared++
        return false
      }
      return true
    })
    while (newBoard.length < ROWS) {
      newBoard.unshift(Array(COLS).fill(0))
    }
    if (cleared > 0) {
      setScore((s) => s + cleared * 100)
      if (score > 500) setLevel(2)
      if (score > 1200) setLevel(3)
    }
    setBoard(newBoard)
  }

  // ---------- MOVE DOWN ----------
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
        saveHighScore()
      }
      setCurrent(next)
    }
  }

  // ---------- SAVE SCORE ----------
  const saveHighScore = () => {
    const newScores = [...highScores, score]
      .sort((a, b) => b - a)
      .slice(0, 10)
    setHighScores(newScores)
    localStorage.setItem("tetrisHighScores", JSON.stringify(newScores))
  }

  // ---------- CONTROLS ----------
  const handleKey = (e) => {
    if (gameOver) return
    let moved
    switch (e.key) {
      case "ArrowLeft":
        moved = { ...current, x: current.x - 1 }
        if (!collision(moved)) setCurrent(moved)
        break
      case "ArrowRight":
        moved = { ...current, x: current.x + 1 }
        if (!collision(moved)) setCurrent(moved)
        break
      case "ArrowDown":
        drop()
        break
      case "ArrowUp":
        const r = { ...current, shape: rotate(current.shape) }
        if (!collision(r)) setCurrent(r)
        break
    }
  }

  // ---------- GAME LOOP ----------
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) drop()
    }, dropSpeeds[level])

    return () => clearInterval(interval)
  }, [current, gameOver, level])

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  })

  // ---------- DRAW ----------
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, 300, 600)

    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = COLORS[cell]
          ctx.fillRect(x * 30, y * 30, 30, 30)
        }
      })
    })

    // Draw current piece
    current.shape.forEach((row, dy) => {
      row.forEach((val, dx) => {
        if (val) {
          ctx.fillStyle = COLORS[current.type]
          ctx.fillRect((current.x + dx) * 30, (current.y + dy) * 30, 30, 30)
        }
      })
    })
  }, [board, current])

  // ---------- RESTART ----------
  const restart = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)))
    setCurrent(randomShape())
    setScore(0)
    setLevel(1)
    setGameOver(false)
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      {/* ------- Griffon Logo (Game Over Only) ------- */}
      {gameOver && (
        <img
          src="/logos/griffon_logo.svg"
          className="absolute top-6 opacity-40 w-40"
        />
      )}

      <canvas
        ref={canvasRef}
        width={300}
        height={600}
        className="border-4 border-gray-800 shadow-xl bg-black"
      />

      <div className="text-white text-center mt-4">
        <p className="text-xl font-bold">Score: {score}</p>
        <p className="text-lg">Level: {level}</p>
      </div>

      {gameOver && (
        <button
          onClick={restart}
          className="mt-4 bg-red-600 px-5 py-2 text-white rounded shadow"
        >
          Restart
        </button>
      )}

      {/* ------- High Score Leaderboard ------- */}
      <div className="mt-8 text-gray-200 w-64">
        <h2 className="text-xl font-bold mb-2 text-center">
          High Scores
        </h2>
        <div className="bg-gray-900 rounded p-3 border border-gray-700">
          {highScores.length === 0 && <p>No scores yet</p>}
          {highScores.map((s, i) => (
            <p key={i} className="border-b border-gray-700 py-1">
              {i + 1}. {s}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tetris
