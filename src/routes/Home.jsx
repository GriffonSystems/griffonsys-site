import ReviewsMarqueeStatic from '../components/ReviewsMarqueeStatic'
import VideoHero from '../components/VideoHero'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Griffon Systems | Video Surveillance & Access Control Solutions</title>
        <meta
          name="description"
          content="Illinois-based integrator delivering Avigilon, Verkada, and Alta video surveillance and access control systems for manufacturing, municipal, and enterprise clients."
        />
        <link rel="canonical" href="https://www.griffonsys.com" />
      </Helmet>

      <VideoHero />

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Core Solutions</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* 1) Cloud Video Surveillance */}
          <div
            className="relative card p-6 flex flex-col h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/home/cloud-video.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" /> {/* overlay */}
            <div className="relative z-10 flex flex-col h-full text-white">
              <h3 className="text-xl font-semibold mb-2">Cloud Video Surveillance</h3>
              <p className="text-gray-100 mb-4">
                Modern, scalable systems with AI analytics and remote access.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/verkada#video">
                  Explore Verkada
                </Link>
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/avigilon-cloud">
                  Explore Avigilon
                </Link>
              </div>
            </div>
          </div>

          {/* 2) Cloud Access Control */}
          <div
            className="relative card p-6 flex flex-col h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/home/cloud-access.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col h-full text-white">
              <h3 className="text-xl font-semibold mb-2">Cloud Access Control</h3>
              <p className="text-gray-100 mb-4">
                Mobile credentials, remote unlock, and cloud management for doors and elevators.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/verkada#access">
                  Explore Verkada
                </Link>
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/alta">
                  Explore Alta Access
                </Link>
              </div>
            </div>
          </div>

          {/* 3) On-Prem Video Surveillance */}
          <div
            className="relative card p-6 flex flex-col h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/home/onprem.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col h-full text-white">
              <h3 className="text-xl font-semibold mb-2">On-Prem Video Surveillance</h3>
              <p className="text-gray-100 mb-4">
                Enterprise-grade reliability for campuses, plants, and regulated environments.
              </p>
              <div className="mt-auto">
                <Link className="btn btn-primary w-full md:w-auto" to="/brands/avigilon">
                  Explore Avigilon
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <ReviewsMarqueeStatic />
    </main>
  )
}
