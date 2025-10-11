import React from 'react'
export default function Gallery({ base }){
  const [items,setItems]=React.useState([])
  const [lightbox,setLightbox]=React.useState(null)
  React.useEffect(()=>{fetch(`${base}/index.json`).then(r=>r.json()).then(j=>setItems(j.images||[])).catch(()=>setItems([]))},[base])
  return (<>
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {items.map(n=>(
        <button key={n} onClick={()=>setLightbox(`${base}/${n}`)} className='block card overflow-hidden'>
          <img src={`${base}/${n}`} alt={n} className='w-full h-56 object-cover' loading='lazy'/>
        </button>
      ))}
    </div>
    {lightbox && <div className='fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-6' onClick={()=>setLightbox(null)}>
      <img src={lightbox} alt='preview' className='max-w-full max-h-full rounded-xl shadow-2xl'/>
    </div>}
  </>)
}
