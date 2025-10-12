{t.key === 'intercom' && (
  <>
    {/* Feature pillars */}
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {[
        { title: 'Video Intercom', desc: '5MP video, crisp audio, AI analytics on every call.' },
        { title: 'Access Controller', desc: 'Grant or deny entry directly from the call UI.' },
        { title: 'Door Reader', desc: 'HF/LF cards, mobile NFC/BLE, and QR credentials.' },
        { title: 'Multi-Purpose Keypad', desc: 'PIN entry, MFA, or multi-tenant directory (TD63).' },
        { title: 'Clear Imaging', desc: '130° FoV, WDR, and night mode for any lighting.' },
        { title: 'Hear & Be Heard', desc: '4 mics with noise cancellation and echo reduction.' },
      ].map(card => (
        <div key={card.title} className="card p-6">
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-700">{card.desc}</p>
        </div>
      ))}
    </div>

    {/* Models grid */}
    <h2 className="text-2xl font-semibold mb-4">Intercom Models</h2>
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {[
        {
          key: 'TD33', img: '/vendors/verkada/intercom/td33.jpg',
          blurb: 'Slim form factor for mullions and tight spaces.',
          io: ['2 × dry inputs', '1 × dry relay', '1 × RS-485'],
          creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code']
        },
        {
          key: 'TD53', img: '/vendors/verkada/intercom/td53.jpg',
          blurb: 'Full-size intercom with exceptional audio and scan.',
          io: ['3 × dry inputs', '2 × dry relays', '1 × RS-485'],
          creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code']
        },
        {
          key: 'TD63', img: '/vendors/verkada/intercom/td63.jpg',
          blurb: 'Full-size intercom with integrated keypad.',
          io: ['3 × dry inputs', '2 × dry relays', '1 × RS-485'],
          creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code', 'PIN code']
        },
      ].map(m => (
        <div key={m.key} className="card p-6 flex flex-col">
          <img src={m.img} alt={m.key} className="w-full h-40 object-contain mb-4 bg-gray-50 rounded-lg" />
          <h3 className="text-xl font-semibold">{m.key}</h3>
          <p className="text-gray-700 mb-4">{m.blurb}</p>
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
            <div><span className="font-medium">I/O:</span> {m.io.join(' · ')}</div>
            <div><span className="font-medium">Credentials:</span> {m.creds.join(' · ')}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Your intercom gallery */}
    <Gallery base="/vendors/verkada/intercom" />
  </>
)}
