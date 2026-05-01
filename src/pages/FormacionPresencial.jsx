import ProductCard from '../components/ProductCard'
import presencialCourses from '../data/presencialCourses'

const BANNER = 'https://viananails.com/wp-content/uploads/2022/09/about-title-image-1.jpg'

export default function FormacionPresencial({ onAddToCart, onNavigate }) {
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
          <p className="font-body text-viana-pink font-medium text-sm uppercase tracking-widest mb-3">Academia Viana Nails</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide">Formación Presencial</h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
          <p className="mt-5 font-body text-gray-300 max-w-xl mx-auto text-base leading-relaxed">
            Aprende con profesionales, en grupos reducidos, con todos los materiales incluidos. Tu futuro empieza aquí.
          </p>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-viana-cream py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: '👥', title: 'Grupos Reducidos', desc: 'Atención personalizada para cada alumna' },
            { icon: '🧰', title: 'Kit Incluido', desc: 'Materiales de alta calidad en todos los cursos' },
            { icon: '📜', title: 'Certificado', desc: 'Diploma acreditativo al finalizar el curso' },
          ].map(item => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-body font-bold text-viana-dark text-sm uppercase tracking-wide">{item.title}</h3>
              <p className="font-body text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl text-viana-dark">Nuestros Cursos Presenciales</h2>
            <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
            <p className="mt-4 font-body text-gray-500 max-w-xl mx-auto">
              Clases presenciales en Noez, Toledo. Grupos reducidos para garantizar el mejor aprendizaje.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {presencialCourses.map(course => (
              <ProductCard key={course.id} product={course} onAddToCart={onAddToCart} />
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

      {/* Próximos cursos CTA */}
      <div className="bg-viana-cream py-16 text-center px-4">
        <h3 className="font-display text-3xl text-viana-dark mb-3">¿Cuándo es el próximo curso?</h3>
        <p className="font-body text-gray-500 mb-6 max-w-md mx-auto">
          Consulta las fechas disponibles o escríbenos para reservar tu plaza.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => onNavigate('proximos')} className="btn-primary">
            Ver Próximos Cursos
          </button>
          <a
            href="https://wa.me/34609338229"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
