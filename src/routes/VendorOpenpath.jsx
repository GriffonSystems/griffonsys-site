export default function VendorOpenpath(){
  const features=['Mobile and badge-based credentials','Cloud management and remote unlock','Visitor and elevator controls']
  return (
    <main className='container py-12'>
      <h1 className='text-3xl font-bold mb-4'>Openpath Access Control</h1>
      <p className='text-gray-700 mb-6'>Modern, cloud-managed access control that users love.</p>
      <ul className='list-disc list-inside text-gray-700 space-y-2'>
        {features.map(f=> <li key={f}>{f}</li>)}
      </ul>
    </main>
  )
}
