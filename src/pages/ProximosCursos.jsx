const BANNER = 'https://viananails.com/wp-content/uploads/2022/09/about-title-image-1.jpg'

export default function ProximosCursos({ onNavigate }) {
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
          <p className="font-body text-viana-pink font-medium text-sm uppercase tracking-widest mb-3">Calendario</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide">Próximos Cursos</h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-viana-cream mb-8">
            <svg className="w-10 h-10 text-viana-pink" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-viana-dark mb-4">
            Próximamente nuevas fechas
          </h2>
          <p className="font-body text-gray-500 text-base leading-relaxed mb-6">
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
      </section>

      {/* CTA banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <button
          onClick={() => onNavigate('formacion')}
          className="group relative overflow-hidden flex items-center justify-center py-14 px-8 text-center"
        >
          <div className="absolute inset-0 bg-viana-gradient opacity-85 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative font-body font-bold text-white text-sm sm:text-base uppercase tracking-widest z-10">
            CONOCE NUESTRA FORMACIÓN PRESENCIAL
          </span>
        </button>
        <button
          onClick={() => onNavigate('academia')}
          className="group relative overflow-hidden flex items-center justify-center py-14 px-8 text-center bg-viana-dark"
        >
          <div className="absolute inset-0 bg-viana-dark group-hover:bg-viana-dark/80 transition-colors duration-300" />
          <span className="relative font-body font-bold text-white text-sm sm:text-base uppercase tracking-widest z-10">
            DESCUBRE NUESTRA ACADEMIA ONLINE
          </span>
        </button>
      </div>
    </>
  )
}
