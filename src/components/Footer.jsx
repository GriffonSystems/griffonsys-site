export default function Footer(){
  return (
    <footer className='border-t mt-16'>
      <div className='container py-8 text-sm text-gray-600 flex flex-col md:flex-row gap-3 items-center justify-between'>
        <div>© {new Date().getFullYear()} Griffon Systems. All rights reserved.</div>
        <div className='flex items-center gap-4'>
          <a className='hover:underline' href='/sitemap.xml'>Sitemap</a>
          <a className='hover:underline' href='/robots.txt'>Robots</a>
        </div>
      </div>
    </footer>
  )
}
