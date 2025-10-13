// src/routes/Home.jsx
import VideoHero from '../components/VideoHero'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <main>
      <VideoHero />

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Core Solutions</h2>

        {/* 2×2 on tablet, 3 across on desktop; equal-height cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* 1) Cloud Video Surveillance — Verkada + Avigilon (cloud) */}
          <div className="card p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-2">Cloud Video Surveillance</h3>
            <p className="text-gray-600 mb-4">
              Modern, scalable systems with AI analytics and remote access.
            </p>
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Link className="btn btn-primary w-full sm:w-auto" to="/vendors/verkada#video">
                Explore Verkada
              </Link>
              <Link className="btn btn-primary w-full sm:w-auto" to="/vendors/avigilon-cloud">
                Explore Avigilon
              </Link>
            </div>
          </div>

          {/* 2) Cloud Access Control — Verkada + Alta */}
          <div className="card p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-2">Cloud Access Control</h3>
            <p className="text-gray-600 mb-4">
              Mobile credentials, remote unlock, and cloud management for doors and elevators.
            </p>
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Link className="btn btn-primary w-full sm:w-auto" to="/vendors/verkada#access">
                Explore Verkada
              </Link>
              {/* Remove this if you don't have an Alta page yet */}
              <Link className="btn btn-primary w-full sm:w-auto" to="/vendors/alta">
                Explore Alta Access
              </Link>
            </div>
          </div>

          {/* 3) On-Prem Video Surveillance — Avigilon */}
          <div className="card p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-2">On-Prem Video Surveillance</h3>
            <p className="text-gray-600 mb-4">
              Enterprise-grade reliability for campuses, plants, and regulated environments.
            </p>
            <div className="mt-auto">
              <Link className="btn btn-primary w-full md:w-auto" to="/vendors/avigilon">
                Explore Avigilon
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
