import React from 'react';

export function VideoBanner(){
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover"
             src="/public/videos/Optimize-Access.mp4" autoPlay muted loop playsInline preload="metadata" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Griffon Systems</h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl">Surveillance & access control — Avigilon, Verkada, Openpath.</p>
      </div>
    </section>
  );
}

function Section({ title, children }){
  return (
    <section className="px-6 md:px-12 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Gallery({ base }) {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch(`${base}/index.json`).then(r=>r.json()).then(j=>setItems(j.images||[])).catch(()=>setItems([]));
  }, [base]);
  if (!items.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((name) => (
        <img key={name} src={`${base}/${name}`} alt={name.replace(/[-_]/g,' ').replace(/\..+$/,'')} className="rounded-xl border" loading="lazy" />
      ))}
    </div>
  );
}

export default function SiteShell(){
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <VideoBanner />
      <Section title="Verkada Gallery">
        <Gallery base="/vendors/verkada" />
      </Section>
      <Section title="Avigilon Gallery">
        <Gallery base="/vendors/avigilon" />
      </Section>
    </div>
  );
}
