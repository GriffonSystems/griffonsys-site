export default function VideoHero(){
  return (
    <section className='relative h-[60vh] md:h-[70vh] overflow-hidden'>
      <video className='absolute inset-0 w-full h-full object-cover' src='/public/videos/Optimize-Access.mp4' autoPlay muted loop playsInline preload='metadata'/>
      <div className='absolute inset-0 bg-black/40' />
      <div className='relative z-10 h-full flex flex-col items-center justify-center text-center px-6'>
        <h1 className='text-white text-4xl md:text-6xl font-bold mb-4'>Smarter Security Starts Here</h1>
        <p className='text-white/90 text-lg md:text-xl max-w-2xl'>Video Surveillance & Access Control — Cloud or on-Prem - Avigilon, Verkada.</p>
      </div>
    </section>
  )
}
