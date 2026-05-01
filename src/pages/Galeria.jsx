import { useState, useEffect, useCallback } from 'react'

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

function GalleryImage({ url, alt, index, onOpen }) {
  const [error, setError] = useState(false)
  if (error) return null
  return (
    <div
      className="break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-md group cursor-zoom-in"
      onClick={() => onOpen(index)}
    >
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

function Lightbox({ index, onClose, onPrev, onNext }) {
  const img = GALLERY_IMAGES[index]
  const [imgError, setImgError] = useState(false)

  // Reset error state when image changes
  useEffect(() => { setImgError(false) }, [index])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-body text-white/60 text-sm select-none">
        {index + 1} / {GALLERY_IMAGES.length}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Cerrar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        {imgError ? (
          <div className="w-64 h-64 flex items-center justify-center text-white/40 font-body text-sm">
            Imagen no disponible
          </div>
        ) : (
          <img
            src={img.url}
            alt={img.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Siguiente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}

export default function Galeria({ onNavigate }) {
  const [lightbox, setLightbox] = useState(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setLightbox(i => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), [])
  const next = useCallback(() => setLightbox(i => (i + 1) % GALLERY_IMAGES.length), [])

  useEffect(() => {
    if (lightbox === null) return
    function onKey(e) {
      if (e.key === 'Escape')      closeLightbox()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prev, next])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

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
              <GalleryImage key={i} url={img.url} alt={img.alt} index={i} onOpen={setLightbox} />
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

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={closeLightbox} onPrev={prev} onNext={next} />
      )}
    </>
  )
}
