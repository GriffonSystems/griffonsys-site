// src/routes/VendorAlta.jsx
export default function VendorAlta() {
  const features = [
    'Mobile and badge credentials (MFA-ready)',
    'Cloud management with role-based access',
    'Remote unlock, schedules, and door states',
    'Visitor flows and elevator controls',
    'Open API and integrations',
  ]

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Alta Access Control</h1>
      <p className="text-gray-700 mb-6 max-w-3xl">
        Cloud-managed access that simplifies deployment and day-to-day operations while improving the user experience.
        Centralize sites, policies, and credentials across locations with modern admin tools.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">Why Alta</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">Popular Use Cases</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Multi-tenant offices and distributed portfolios</li>
            <li>Hybrid work with mobile credentials</li>
            <li>Elevator + door control from one pane</li>
            <li>Contractor and visitor management</li>
          </ul>
        </div>
      </div>

      <a href="/contact" className="btn btn-primary">Request an Alta Demo</a>
    </main>
  )
}
