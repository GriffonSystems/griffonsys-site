export default function Industries() {
  const items = [
    {
      title: 'Manufacturing',
      desc: 'Rugged systems for production floors and yards',
      img: '/images/industries/manufacturing.jpg',
    },
    {
      title: 'Education',
      desc: 'K-12 and Higher-Ed with privacy controls and alerts',
      img: '/images/industries/education.jpg',
    },
    {
      title: 'Municipal',
      desc: 'City facilities, utilities, and law enforcement needs',
      img: '/images/industries/municipal.jpg',
    },
    {
      title: 'Commercial',
      desc: 'Offices, retail, and mixed-use properties',
      img: '/images/industries/commercial.jpg',
    },
  ];

  }`}
/>

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Industries</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map(({ title, desc, img }) => (
          <div
            key={title}
            tabIndex={0}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 transition"
          >
            <img
              src={img}
              alt={title}
              className="w-full h-48 md:h-60 object-cover transform transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-1 text-sm opacity-90">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
