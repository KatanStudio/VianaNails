import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useCourses } from '../hooks/useCourses'

const BANNER = 'https://viananails.com/wp-content/uploads/2022/09/booking-title-image-1.jpg'
const FILTERS = ['Todos', 'Presencial', 'Online', 'Próximos Servicios']

function InfoStrip({ items }) {
  return (
    <div className="bg-viana-cream py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {items.map(item => (
          <div key={item.title} className="flex flex-col items-center gap-2">
            <span className="text-3xl">{item.icon}</span>
            <h3 className="font-body font-bold text-viana-dark text-sm uppercase tracking-wide">{item.title}</h3>
            <p className="font-body text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProximosCursosSection() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-viana-cream mb-8">
          <svg className="w-10 h-10 text-viana-pink" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-viana-dark mb-4">
          Próximamente nuevas fechas
        </h2>
        <p className="font-body text-gray-500 text-base leading-relaxed mb-4">
          Las fechas de los próximos cursos se publican a través de nuestras redes sociales y por WhatsApp.
          Si quieres ser de las primeras en enterarte, ¡síguenos en Instagram o escríbenos directamente!
        </p>
        <p className="font-body text-gray-500 text-base leading-relaxed mb-10">
          También puedes contactarnos para consultar disponibilidad o apuntarte a la lista de espera de cualquier curso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/34609338229"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Escríbenos por WhatsApp
          </a>
          <a
            href="https://www.instagram.com/viananails_/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Seguirnos en Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Cursos({ onAddToCart, onNavigate, initialFilter = 'Todos', currency = 'EUR' }) {
  const [filter, setFilter] = useState(initialFilter)
  const { courses, loading, error } = useCourses()

  const isProximos = filter === 'Próximos Servicios'

  const visible = isProximos
    ? []
    : filter === 'Todos'
    ? courses
    : courses.filter(p => p.type === filter.toLowerCase())

  return (
    <>
      {/* Page Header */}
      <div className="relative bg-viana-dark overflow-hidden">
        <img
          src={BANNER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-viana-dark/50 to-viana-dark/80" />
        <div className="relative z-10 pt-36 pb-16 text-center max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-body text-viana-pink font-medium text-sm uppercase tracking-widest mb-3">Formación profesional</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide">Servicios</h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
          <p className="mt-5 font-body text-gray-300 max-w-xl mx-auto text-base leading-relaxed">
            Toda nuestra oferta formativa, presencial y online. Encuentra el curso que mejor se adapta a ti.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body font-medium px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                filter === f
                  ? 'bg-viana-gradient text-white shadow-md'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {isProximos ? (
        <ProximosCursosSection />
      ) : (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {loading ? (
              <p className="text-center font-body text-sm text-gray-400 mb-8">Cargando cursos...</p>
            ) : error ? (
              <p className="text-center font-body text-sm text-red-400 mb-8">{error}</p>
            ) : (
              <p className="text-center font-body text-sm text-gray-400 mb-8">
                Mostrando {visible.length} resultado{visible.length !== 1 ? 's' : ''}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visible.map(course => (
                <ProductCard key={course._id} product={course} onAddToCart={onAddToCart} currency={currency} />
              ))}
            </div>

            <div className="text-center mt-14">
              <p className="font-body text-gray-500 mb-4">¿Tienes dudas sobre qué curso es el ideal para ti?</p>
              <button onClick={() => onNavigate('contacto')} className="btn-outline">
                Habla con nosotras
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
