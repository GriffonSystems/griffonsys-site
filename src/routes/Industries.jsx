export default function Industries(){
  const items=[
    ['Manufacturing','Rugged systems for production floors and yards'],
    ['Education','K‑12 and Higher‑Ed with privacy controls and alerts'],
    ['Municipal','City facilities, utilities, and law enforcement needs'],
    ['Commercial','Offices, retail, and mixed‑use properties'],
  ]
  return (
    <main className='container py-12'>
      <h1 className='text-3xl font-bold mb-6'>Industries</h1>
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
