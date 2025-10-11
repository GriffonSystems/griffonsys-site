import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <main className='container py-20 text-center'>
      <h1 className='text-5xl font-bold mb-4'>404</h1>
      <p className='text-gray-600 mb-6'>We couldn’t find that page.</p>
      <Link to='/' className='btn btn-primary'>Go Home</Link>
    </main>
  )
}
