import React from "react"
import TetrisGame from "./TetrisGame"  // <-- Make sure this file exists too

export default function TetrisModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">

      <div className="relative bg-gray-950 border border-gray-700 rounded-xl p-6 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-300 hover:text-white text-2xl"
        >
          ✕
        </button>

        <TetrisGame />
      </div>

    </div>
  )
}
