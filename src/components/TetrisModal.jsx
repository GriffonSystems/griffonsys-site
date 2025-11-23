import React, { useState } from "react"
import TetrisModal from "./TetrisModal"

export default function Footer() {
  const [tetrisOpen, setTetrisOpen] = useState(false)

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="container py-12 grid md:grid-cols-3 gap-10">

          {/* Your existing footer columns */} 

          <button
            onClick={() => setTetrisOpen(true)}
            className="text-gray-400 hover:text-white underline"
          >
            Play Tetris
          </button>

        </div>
      </footer>

      <TetrisModal open={tetrisOpen} onClose={() => setTetrisOpen(false)} />
    </>
  )
}
