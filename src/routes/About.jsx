// src/routes/About.jsx
import React from 'react'

export default function About() {
  // Replace these with the activity IDs of the posts you want to show
  const POST_1 = '7381430950704046082'
  const POST_2 = '7378967268157927425'

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">About Griffon Systems</h1>

      <p className="text-lg text-gray-800 mb-8">
        Griffon Systems, Inc. designs high-resolution IP megapixel (Avigilon, Verkada, Axis)
        video surveillance systems for its broad range of customers.
      </p>

      <h2 className="text-2xl font-semibold mb-4">From Paul on LinkedIn</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Post 1 */}
        <div className="relative w-full min-h-[520px] rounded-xl overflow-hidden border">
          <iframe
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${POST_1}`}
            title="LinkedIn post 1"
            allow="encrypted-media; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Post 2 */}
        <div className="relative w-full min-h-[520px] rounded-xl overflow-hidden border">
          <iframe
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${POST_2}`}
            title="LinkedIn post 2"
            allow="encrypted-media; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      {/* Optional: small note if embeds are blocked by extensions */}
      <noscript>
        You need JavaScript enabled to view LinkedIn embeds.
      </noscript>
    </main>
  )
}
