export default function VideoHero(){
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <img
        src="/hero/hero.jpg"
        alt="Griffon Systems — surveillance and access control"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Smarter Security Starts Here
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl">
          Surveillance & access control — Avigilon, Verkada, Alta.
        </p>
      </div>
    </section>
  )
}
