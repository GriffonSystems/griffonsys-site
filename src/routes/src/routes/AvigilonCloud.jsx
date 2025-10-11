import Gallery from '../components/Gallery'
import { Link } from 'react-router-dom'

export default function AvigilonCloud(){
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Avigilon Cloud Video</h1>
      <p className="text-gray-700 mb-6 max-w-3xl">
        Cloud-managed video with enterprise reliability, simple deployment, and powerful analytics.
        Ideal for distributed sites that want centralized visibility without heavy on-prem hardware.
      </p>

      {/* Highlights / bullets (edit to taste) */}
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-10">
        <li>Remote access and health monitoring</li>
        <li>AI-powered search and alerts</li>
        <li>Hybrid options for high-retention or bandwidth constraints</li>
      </ul>

      {/* Reuse your Avigilon gallery assets */}
      <Gallery base="/vendors/avigilon" />

      <div className="mt-10">
        <Link className="btn btn-primary" to="/contact">Request a Cloud Assessment</Link>
      </div>
    </main>
  )
}
