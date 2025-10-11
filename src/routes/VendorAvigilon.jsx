import Gallery from '../components/Gallery'
export default function VendorAvigilon(){
  return (
    <main className='container py-12'>
      <h1 className='text-3xl font-bold mb-4'>Avigilon Systems</h1>
      <p className='text-gray-700 mb-6'>Enterprise‑grade video security with powerful analytics and on‑prem or hybrid deployments.</p>
      <Gallery base='/vendors/avigilon' />
    </main>
  )
}
