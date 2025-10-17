// src/routes/About.jsx
import React from 'react'

export default function About() {
  // ✅ Updated LinkedIn post IDs
  const POST_1 = '7182407145689169920' // thebestorwhybother post
  const POST_2 = '7378967268157927425' // your existing right-side post

  return (
    <main className="container py-12">
      {/* ---------- Header ---------- */}
      <h1 className="text-3xl font-bold mb-4">About Griffon Systems</h1>

      <p className="text-lg text-gray-800 mb-10 max-w-3xl">
        Griffon Systems, Inc. designs and deploys high-resolution IP video surveillance systems
        from leading manufacturers including <strong>Avigilon</strong>, <strong>Verkada</strong>, and <strong>Axis</strong>.
        Our mission is to deliver intelligent, scalable, and secure technology solutions
        that help organizations protect their people, property, and productivity.
      </p>

      {/* ---------- LinkedIn Posts ---------- */}
      <section className="bg-gray-50 py-10 px-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Recent LinkedIn Highlights
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Post 1 (left) */}
          <div className="relative w-full h-[380px] rounded-xl overflow-hidden border shadow-sm bg-white">
            <iframe
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${POST_1}`}
              title="LinkedIn post 1"
              allow="encrypted-media; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Post 2 (right) */}
          <div className="relative w-full h-[380px] rounded-xl overflow-hidden border shadow-sm bg-white">
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

        {/* Graceful fallback if JavaScript or embeds blocked */}
        <noscript>
          You need JavaScript enabled to view LinkedIn embeds.
        </noscript>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Ready to Connect?</h2>
        <p className="text-gray-600 mb-6">
          Follow us on LinkedIn for real-world deployment stories and new technology updates.
        </p>
        <a
          href="https://www.linkedin.com/in/paul-grefenstette-0667211"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Visit Our LinkedIn →
        </a>
      </section>
    </main>
  )
}
