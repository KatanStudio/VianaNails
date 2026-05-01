import { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  {
    src: 'https://viananails.com/wp-content/uploads/2022/09/rev-slider-image-2.jpg',
    alt: 'Curso Manicura Rusa',
    title: 'Curso Manicura Rusa',
    href: 'https://viananails.com/producto/curso-manicura-rusa/',
  },
  {
    src: 'https://viananails.com/wp-content/uploads/2022/09/rev-slider-image-1.jpg',
    alt: 'Curso Acrílico',
    title: 'Curso Acrílico',
    href: 'https://viananails.com/producto/curso-acrilico/',
  },
  {
    src: 'https://viananails.com/wp-content/uploads/2022/09/about-title-image-1.jpg',
    alt: 'Curso Sistema Dual',
    title: 'Curso Sistema Dual',
    href: 'https://viananails.com/producto/curso-sistema-dual/',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100vh', minHeight: '480px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Carrusel de cursos"
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
      ))}

      {/* Centered course info overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white drop-shadow-lg mb-8">
              {slide.title}
            </h2>
            <a
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-body font-semibold text-sm uppercase tracking-widest px-10 py-3 rounded-full hover:bg-white hover:text-viana-dark transition-all duration-200"
            >
              Leer más
            </a>
          </div>
        ))}
      </div>

      {/* Arrow: prev */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all duration-200"
        aria-label="Slide anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Arrow: next */}
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all duration-200"
        aria-label="Slide siguiente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
