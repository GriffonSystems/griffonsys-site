// src/routes/About.jsx
import LinkedInFeed from '../components/LinkedInFeed'

export default function About(){
  return (
    <main className="container py-12">
      {/* ...your about content... */}
      <h2 className="text-2xl font-semibold mt-12 mb-4">From Paul on LinkedIn</h2>
      <LinkedInFeed />
    </main>
  )
}
