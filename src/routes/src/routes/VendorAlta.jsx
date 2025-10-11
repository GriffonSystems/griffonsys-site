export default function VendorAlta(){
  const features = [
    "Mobile and badge credentials (MFA-ready)",
    "Cloud management with role-based access",
    "Visitor flows and elevator controls",
    "Open API and integrations",
  ]
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Alta Access Control</h1>
      <p className="text-gray-700 mb-6 max-w-3xl">
        Cloud-managed access that simplifies deployment and day-to-day operations while improving user experience.
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
        {features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <a href="/contact" className="btn btn-primary">Request a Demo</a>
    </main>
  )
}
