{active === 'video' && (
  <section className="space-y-10">
    <div>
      <h2 className="text-2xl font-semibold mb-2">Explore our models and get started today</h2>
      <p className="text-gray-700">
        Pick the right camera family for your environment. We carry the full Verkada line and can help you size storage, bandwidth, and lenses.
      </p>
    </div>

    {/* Category tiles */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          key: 'dome',
          title: 'Dome',
          desc: 'Reliable and versatile performance in almost any location.',
          img: '/vendors/verkada/video/CH53_primary_render.png',             // update to your dome image
        },
        {
          key: 'mini',
          title: 'Mini',
          desc: 'Compact form factor for discreet monitoring in tight spaces.',
          img: '/vendors/verkada/video/CM41-E_Front Ground Light.png',       // update filename if needed
        },
        {
          key: 'bullet',
          title: 'Bullet',
          desc: 'Optimized for license plate recognition and highly-detailed monitoring.',
          img: '/vendors/verkada/video/CH63_primary_render.png',             // replace with your bullet image
        },
        {
          key: 'fisheye',
          title: 'Fisheye',
          desc: '180-degree monitoring for expansive areas.',
          img: '/vendors/verkada/video/CF83-E Fisheye NoShadow CF83-E_Fisheye_NoShadow.png',
        },
        {
          key: 'multisensor',
          title: 'Multisensor',
          desc: 'Two or four sensors in one unit for holistic coverage.',
          img: '/vendors/verkada/video/CF83 Explode.jpg',                     // or a true multisensor image if you have one
        },
        {
          key: 'ptz',
          title: 'PTZ',
          desc: 'Flexible, wide-area coverage at a distance.',
          img: '/vendors/verkada/video/20230712_CP5262_PTZ_Camera_Decal.png',
        },
        {
          key: 'remote',
          title: 'Remote',
          desc: 'Built-in battery and LTE modem for remote deployments.',
          img: '/vendors/verkada/video/20230505_CM42_table top.png',          // swap to your remote/LTE image if different
        },
      ].map(cat => (
        <div key={cat.key} className="card p-6 flex flex-col">
          <img
            src={encodeURI(cat.img)}     // handles spaces in filenames
            alt={cat.title}
            className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold">{cat.title}</h3>
          <p className="text-gray-700 mb-4">{cat.desc}</p>
          <div className="mt-auto">
            {/* Point wherever you want: contact form, or anchors to sub-sections/pages */}
            <a href="/contact" className="btn btn-primary">Learn more</a>
          </div>
        </div>
      ))}
    </div>

    {/* Keep your gallery below the tiles */}
    <div id="models-gallery">
      <h3 className="text-xl font-semibold mb-4">In the field</h3>
      <Gallery base="/vendors/verkada/video" />
    </div>
  </section>
)}
