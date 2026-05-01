import { useState, useEffect } from 'react'
import logo from '../assets/logoViana.svg'

const SLIDES = [
  'https://viananails.com/wp-content/uploads/2022/09/rev-slider-image-2.jpg',
  'https://viananails.com/wp-content/uploads/2022/09/rev-slider-image-1.jpg',
  'https://viananails.com/wp-content/uploads/2022/09/about-title-image-1.jpg',
  'https://viananails.com/wp-content/uploads/2023/04/manos-mujeres-hermosas-manicura-negra-despues-procedimientos-spa-concepto-tratamiento-spa_186202-8900.jpg',
]

export default function Hero({ onNavigate }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background carousel — crossfade, no controls */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden="true"
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Logo */}
        <img
          src={logo}
          alt="Viana Nails"
          className="w-72 sm:w-96 lg:w-[30rem] mb-10 drop-shadow-lg"
        />

        {/* Gradient divider */}
        <div className="w-20 h-1 rounded-full bg-viana-gradient mb-8" />

        {/* Tagline */}
        <p className="font-body text-white/80 text-lg sm:text-xl max-w-md leading-relaxed mb-10">
          Conviértete en la profesional que siempre quisiste ser
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onNavigate('cursos')}
            className="btn-primary px-10"
          >
            Ver Servicios
          </button>
          <button
            onClick={() => onNavigate('contacto')}
            className="border-2 border-white text-white font-body font-semibold text-sm uppercase tracking-widest px-10 py-3 rounded-full hover:bg-white hover:text-viana-dark transition-all duration-200"
          >
            Contáctanos
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

    </section>
  )
}
