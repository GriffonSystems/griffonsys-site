export default function Solutions(){
  const items=[
    ['Cloud Video Surveillance','Simple deployment, remote access, and automatic updates.'],
    ['On‑Prem Video (NVR/VMS)','High performance systems for regulated and air‑gapped environments.'],
    ['Access Control','Mobile credentials, remote unlock, and visitor management.'],
    ['Video Intercom','Secure entry with integrated cameras and cloud calling.'],
    ['Wireless Backhaul','Point‑to‑point and mesh links for large properties.'],
    ['Maintenance & Support','Health monitoring, quarterly reviews, priority response.'],
  ]
  return (
    <main className='container py-12'>
      <h1 className='text-3xl font-bold mb-6'>Solutions</h1>
      <div className='grid md:grid-cols-2 gap-6'>
        {items.map(([t,d])=> (
          <div key={t} className='card p-6'>
            <h3 className='text-xl font-semibold mb-2'>{t}</h3>
            <p className='text-gray-600'>{d}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
