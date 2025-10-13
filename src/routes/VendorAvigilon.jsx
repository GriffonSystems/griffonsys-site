{/* ========== VIDEO TAB (Avigilon) ========== */}
{active === 'video' && (
  <section className="space-y-10">
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold">Discover Avigilon IP Camera Products</h2>
      <p className="text-gray-700">High-performance cameras for every scene and lighting condition.</p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          key: 'h6a-bullet',
          title: 'H6 Bullet',
          desc: 'High-detail monitoring with next-gen analytics.',
          img: '/vendors/avigilon/video/H6A_Bullet_Product_Detail_Image_1.avif',
        },
        {
          key: 'h6sl',
          title: 'H6SL Value Series',
          desc: 'Cost-effective coverage for mainstream deployments.',
          img: '/vendors/avigilon/video/H6SL_Bullet_1.avif',
        },
        {
          key: 'h6a-ptz',
          title: 'H6A PTZ',
          desc: 'Flexible, long-range coverage with rapid PTZ control.',
          img: '/vendors/avigilon/video/H6A-PTZ-Product_Detail_Image_2_2024-07-02-210404_cxtc.avif',
        },
        {
          key: 'h5a-modular',
          title: 'H5A Modular',
          desc: 'Discreet imager + separate main unit for tight installs.',
          img: '/vendors/avigilon/video/H5A_Modular_01.avif',
        },
        {
          key: 'h5a-multisensor',
          title: 'H5A Multisensor',
          desc: '2–4 sensors in one for panoramic, site-wide coverage.',
          img: '/vendors/avigilon/video/H5A_Multisensor_01_2024-09-02-173128_gmdn.avif',
        },
        {
          key: 'l6a-lpr',
          title: 'L6A License Plate',
          desc: 'Purpose-built for reliable plate capture and analytics.',
          img: '/vendors/avigilon/video/L6A-Product_Detail_Image_1.avif',
        },
      ].map(card => (
        <div key={card.key} className="card p-6 flex flex-col">
          <img
            src={encodeURI(card.img)}
            onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/placeholder.png' }}
            alt={card.title}
            loading="lazy"
            decoding="async"
            className="w-full h-44 object-contain bg-gray-50 rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold">{card.title}</h3>
          <p className="text-gray-700">{card.desc}</p>
          {/* If you add detail pages later, put a Link here */}
        </div>
      ))}
    </div>
  </section>
)}
