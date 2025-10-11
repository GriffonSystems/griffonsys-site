import VideoHero from '../components/VideoHero'
import Gallery from '../components/Gallery'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <main>
      <VideoHero />
      <section className='container py-12'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>Our Core Solutions</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='card p-6'>
            <h3 className='text-xl font-semibold mb-2'>Cloud Video Surveillance</h3>
            <p className='text-gray-600 mb-4'>Modern, scalable systems with AI analytics and remote access.</p>
            <Link className='btn btn-primary' to='/vendors/verkada'>Explore Verkada</Link>
          </div>
          <div className='card p-6'>
            <h3 className='text-xl font-semibold mb-2'>On‑Prem & Hybrid Video</h3>
            <p className='text-gray-600 mb-4'>Enterprise-grade reliability for large campuses and industrial sites.</p>
            <Link className='btn btn-primary' to='/vendors/avigilon'>Explore Avigilon</Link>
          </div>
          <div className='card p-6'>
            <h3 className='text-xl font-semibold mb-2'>Access Control</h3>
            <p className='text-gray-600 mb-4'>Mobile, cloud-managed access for modern facilities.</p>
            <Link className='btn btn-primary' to='/vendors/openpath'>Explore Openpath</Link>
          </div>
        </div>
      </section>
      <section className='container py-12'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>Verkada Highlights</h2>
        <Gallery base='/vendors/verkada' />
      </section>
      <section className='container py-12'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>Avigilon Highlights</h2>
        <Gallery base='/vendors/avigilon' />
      </section>
    </main>
  )
}
