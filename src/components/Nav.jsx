import { Link, NavLink } from 'react-router-dom'

export default function Nav(){
  const base='px-3 py-2 rounded-lg text-sm font-medium'
  const active=({isActive})=> isActive? base+' bg-black text-white' : base+' hover:bg-gray-100'
  return (
    <header className='sticky top-0 z-50 bg-white/90 backdrop-blur border-b'>
      <div className='container flex items-center justify-between h-16'>
        <Link to='/' className='flex items-center gap-2'>
          <span className='inline-block w-8 h-8 rounded-xl bg-blue-600' />
          <span className='font-bold'>Griffon Systems</span>
        </Link>
        <nav className='hidden md:flex items-center gap-1'>
          <NavLink to='/solutions' className={active}>Solutions</NavLink>
          <NavLink to='/vendors/verkada' className={active}>Verkada</NavLink>
          <NavLink to='/vendors/avigilon' className={active}>Avigilon</NavLink>
          <NavLink to='/vendors/openpath' className={active}>Openpath</NavLink>
          <NavLink to='/industries' className={active}>Industries</NavLink>
          <NavLink to='/about' className={active}>About</NavLink>
          <NavLink to='/contact' className={active}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
