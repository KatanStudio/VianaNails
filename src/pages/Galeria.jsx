import { useState } from 'react'

const BANNER = 'https://viananails.com/wp-content/uploads/2023/06/IMG_4833-1.jpeg'

const BASE_23_06 = 'https://viananails.com/wp-content/uploads/2023/06'
const BASE_23_05 = 'https://viananails.com/wp-content/uploads/2023/05'

const GALLERY_IMAGES = [
  { url: `${BASE_23_06}/IMG_4833-1.jpeg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_05}/20230402_172216-scaled.jpg`, alt: 'Depilación con hilo' },
  { url: `${BASE_23_05}/20230405_135042-scaled.jpg`, alt: 'Curso puesta de pestañas pelo a pelo' },
  { url: `${BASE_23_06}/20230212_175546-1.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-19-1.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-18.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-17.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-16.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-15.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-14.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-13.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-12.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-11.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-10.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-9.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-8.jpg`, alt: 'Trabajo alumna' },
  { url: `${BASE_23_06}/2023-06-05-7.jpg`, alt: 'Trabajo alumna' },
]

function GalleryImage({ url, alt }) {
  const [error, setError] = useState(false)

  if (error) return null

  return (
    <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-md group cursor-zoom-in">
      <img
        src={url}
        alt={alt}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  )
}

export default function Galeria({ onNavigate }) {
  return (
    <>
      {/* Page Header */}
      <div className="relative bg-viana-dark overflow-hidden">
        <img
          src={BANNER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-viana-dark/60 to-viana-dark/80" />
        <div className="relative z-10 pt-36 pb-16 text-center max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-body text-viana-pink font-medium text-sm uppercase tracking-widest mb-3">Resultados reales</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide">Galería</h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
        </div>
      </div>

      {/* Description */}
      <div className="bg-viana-cream py-12 text-center px-4">
        <p className="font-body text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          Aquí están los resultados <strong className="text-viana-dark">sin editar</strong> de nuestras alumnas.
          Si deseas aprender como ellas, escríbenos y te informamos.
        </p>
      </div>

      {/* Masonry Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <GalleryImage key={i} url={img.url} alt={img.alt} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-viana-cream py-16 text-center px-4">
        <h3 className="font-display text-3xl text-viana-dark mb-3">¿Quieres aprender como ellas?</h3>
        <p className="font-body text-gray-500 mb-6 max-w-md mx-auto">
          Escríbenos y te informamos sobre todos nuestros cursos disponibles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => onNavigate('contacto')} className="btn-primary">
            Contactar
          </button>
          <button onClick={() => onNavigate('cursos')} className="btn-outline">
            Ver Servicios
          </button>
        </div>
      </div>
    </>
  )
}
