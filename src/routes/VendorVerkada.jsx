import Gallery from '../components/Gallery'
export default function VendorVerkada(){
  return (
    <main className='container py-12'>
      <h1 className='text-3xl font-bold mb-4'>Verkada Solutions</h1>
      <p className='text-gray-700 mb-6'>Cloud-native cameras, access control, and intercom with simple deployment and a 10‑year warranty.</p>
      <Gallery base='/vendors/verkada' />
    </main>
  )
}
