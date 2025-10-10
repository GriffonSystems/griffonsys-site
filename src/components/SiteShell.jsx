import React, { useState } from 'react';
import { Cloud, Building2, Lock } from 'lucide-react';
import axios from 'axios';

const Card = ({ children, className }) => <div className={`rounded-2xl border ${className||''}`}>{children}</div>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className||''}`}>{children}</div>;
const Button = ({ children, className, onClick, type='button' }) => (
  <button type={type} onClick={onClick} className={`rounded-2xl px-4 py-2 bg-black text-white ${className||''}`}>{children}</button>
);

function SafeImg(props){
  const [src, setSrc] = React.useState(props.src);
  return <img {...props} src={src} onError={() => setSrc(props.fallback || '/public/img/real/hero-bg.jpg')} />;
}

function Nav({ onNavigate, active }) {
  const Link = ({id,label}) => (
    <button onClick={()=>onNavigate(id)} className={`px-3 py-2 rounded-xl text-sm ${active===id?'font-semibold text-blue-700':'text-gray-700'}`}>{label}</button>
  );
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-xl bg-blue-600" />
          <span className="font-bold">Griffon Systems</span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <Link id="home" label="Home" />
          <Link id="verkada" label="Verkada" />
          <Link id="avigilon" label="Avigilon" />
          <Link id="openpath" label="Openpath" />
          <Link id="contact" label="Contact" />
        </nav>
      </div>
    </header>
  );
}

export default function SiteShell() {
  const [page, setPage] = useState('home');
  return (
    <div className="bg-white text-gray-900">
      <Nav onNavigate={setPage} active={page} />
      {page==='home' && <HomePage onNavigate={setPage} />}
      {page==='contact' && <ContactPage />}
      {page==='verkada' && <VendorPage title="Verkada Solutions" cta="Request a Verkada Demo" />}
      {page==='avigilon' && <VendorPage title="Avigilon Systems" cta="Talk to an Engineer" />}
      {page==='openpath' && <VendorPage title="Openpath Access Control" cta="See an Openpath Setup" />}
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <div>
      <section className="relative h-[60vh] flex flex-col justify-center items-center text-center" style={{backgroundImage:"url(/public/img/real/hero-bg.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.5)'}}/>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Griffon Systems</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Surveillance & access control — Avigilon, Verkada, Openpath.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-blue-600" onClick={()=>onNavigate('contact')}>Request a Site Assessment</Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-12">Core Solutions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md"><CardContent>
            <Cloud className="mx-auto w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cloud Video</h3>
            <p className="text-gray-600 mb-4">AI analytics & remote access.</p>
            <p className="font-semibold text-blue-600">Verkada • Avigilon Alta</p>
          </CardContent></Card>
          <Card className="p-6 shadow-md"><CardContent>
            <Building2 className="mx-auto w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">On‑Prem & Hybrid</h3>
            <p className="text-gray-600 mb-4">Enterprise reliability.</p>
            <p className="font-semibold text-blue-600">Avigilon Unity</p>
          </CardContent></Card>
          <Card className="p-6 shadow-md"><CardContent>
            <Lock className="mx-auto w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Control</h3>
            <p className="text-gray-600 mb-4">Mobile, cloud-managed access.</p>
            <p className="font-semibold text-blue-600">Openpath • Verkada Access</p>
          </CardContent></Card>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <SafeImg src="/public/img/real/verkada-hero.jpg" fallback="/public/img/real/hero-bg.jpg" alt="Verkada" className="rounded-2xl shadow-lg" loading="lazy" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Verkada Spotlight</h2>
            <p className="text-gray-700 mb-4">Cloud-native cameras & access with automatic updates.</p>
            <ul className="text-gray-700 space-y-2 list-disc list-inside mb-6">
              <li>10-year warranty</li>
              <li>Multi-site management</li>
              <li>AI-powered alerts</li>
            </ul>
            <Button className="bg-blue-600" onClick={()=>onNavigate('verkada')}>Request a Verkada Demo</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function VendorPage({ title, cta }){
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-700 mb-6">We design, deploy, and support scalable systems with clean integrations and hands-on training.</p>
      <Button className="bg-blue-600">{cta}</Button>
    </div>
  );
}

export function ContactPage(){
  const [state, setState] = useState({ name:'', email:'', phone:'', company:'', industry:'', interest:'', message:'' });
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try{
      await axios.post('/api/contact', state);
      setStatus('ok');
      setState({ name:'', email:'', phone:'', company:'', industry:'', interest:'', message:'' });
    }catch(err){
      setStatus('error');
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="relative h-[30vh] rounded-2xl overflow-hidden mb-8" style={{backgroundImage:"url(/public/img/real/contact-hero.jpg)", backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.45)'}}/>
        <div className="relative z-10 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Contact Griffon Systems</h1>
          <p className="text-gray-200">Request a site assessment, schedule a demo, or ask a question. We’ll reply quickly.</p>
        </div>
      </div>

      <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <input className="w-full border rounded-xl p-3" placeholder="Name" value={state.name} onChange={e=>setState({...state, name:e.target.value})}/>
          <input className="w-full border rounded-xl p-3" placeholder="Work email" type="email" value={state.email} onChange={e=>setState({...state, email:e.target.value})}/>
          <input className="w-full border rounded-xl p-3" placeholder="Phone" value={state.phone} onChange={e=>setState({...state, phone:e.target.value})}/>
          <input className="w-full border rounded-xl p-3" placeholder="Company" value={state.company} onChange={e=>setState({...state, company:e.target.value})}/>
          <select className="w-full border rounded-xl p-3" value={state.industry} onChange={e=>setState({...state, industry:e.target.value})}>
            <option value="">Industry</option>
            <option>Manufacturing</option>
            <option>Education (K-12 / Higher-Ed)</option>
            <option>Municipal / Government</option>
            <option>Commercial / Office</option>
            <option>Other</option>
          </select>
          <select className="w-full border rounded-xl p-3" value={state.interest} onChange={e=>setState({...state, interest:e.target.value})}>
            <option value="">Interested In</option>
            <option>Cloud Video (Verkada / Avigilon Alta)</option>
            <option>On-Prem Video (Avigilon Unity)</option>
            <option>Access Control (Openpath / Verkada Access)</option>
            <option>Wireless Backhaul (Ubiquiti / Siklu)</option>
            <option>Service & Maintenance</option>
          </select>
        </div>
        <div className="space-y-3">
          <textarea className="w-full border rounded-xl p-3 min-h-[220px]" placeholder="Tell us about your sites, camera count, doors, or goals..." value={state.message} onChange={e=>setState({...state, message:e.target.value})}/>
          <div className="flex items-center gap-3">
            <input id="consent2" type="checkbox" className="h-4 w-4" required/>
            <label htmlFor="consent2" className="text-sm text-gray-600">I agree to be contacted about this request.</label>
          </div>
          <div>
            <Button type="submit" className="bg-blue-600">{status==='loading'?'Sending...':'Send Request'}</Button>
            {status==='ok' && <span className="ml-3 text-green-600">Thanks! We’ll be in touch.</span>}
            {status==='error' && <span className="ml-3 text-red-600">Something went wrong. Try again.</span>}
          </div>
        </div>
      </form>
    </div>
  );
}
