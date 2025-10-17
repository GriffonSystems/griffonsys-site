export default function Solutions() {
  const items = [
    {
      title: 'Cloud Video Surveillance',
      desc: 'Simple deployment, remote access, and automatic updates.',
      img: '/images/solutions/cloud-video.jpg',
      pos: 'center 40%', // slight upward bias
    },
    {
      title: 'On-Prem Video (NVR/VMS)',
      desc: 'High performance systems for regulated and air-gapped environments.',
      img: '/images/solutions/onprem-video.jpg',
      pos: 'center 45%',
    },
    {
      title: 'Access Control',
      desc: 'Mobile credentials, remote unlock, and visitor management.',
      img: '/images/solutions/access-control.jpg',
      pos: 'center 30%',
    },
    {
      title: 'Video Intercom',
      desc: 'Secure entry with integrated cameras and cloud calling.',
      img: '/images/solutions/video-intercom.jpg',
      pos: 'center 11%', // 👈 moves the image down
    },
    {
      title: 'Wireless Backhaul',
      desc: 'Point-to-point and mesh links for large properties.',
      img: '/images/solutions/wireless-backhaul.jpg',
      pos: 'center 1%', // 👈 moves down even more
    },
    {
      title: 'Maintenance & Support',
      desc: 'Health monitoring, quarterly reviews, priority response.',
      img: '/images/solutions/maintenance.jpg',
      pos: 'center 1%', // 👈 lowers the focus point
    },
  ]

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Solutions</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="relative card overflow-hidden text-white group"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: item.pos || 'center',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all"></div>

            {/* Text */}
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-200">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
