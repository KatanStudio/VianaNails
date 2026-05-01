const BASE = 'https://viananails.com/wp-content/uploads'

const FEATURED = [
  {
    id: 'manicura-rusa',
    name: 'Curso Manicura Rusa',
    image: `${BASE}/2023/04/manos-mujeres-hermosas-manicura-negra-despues-procedimientos-spa-concepto-tratamiento-spa_186202-8900.jpg`,
    priceFrom: 39,
    priceTo: 199,
    href: 'https://viananails.com/producto/curso-manicura-rusa/',
  },
  {
    id: 'acrilico',
    name: 'Curso acrílico',
    image: `${BASE}/2023/04/acrilico-curso-594x594.jpg`,
    priceFrom: 49,
    priceTo: 199,
    href: 'https://viananails.com/producto/curso-acrilico/',
  },
  {
    id: 'sistema-dual',
    name: 'Curso Sistema Dual',
    image: `${BASE}/2023/04/fe8c1c9031cbab7bd6ed41cb058cb2f8.jpg`,
    priceFrom: 49,
    priceTo: 199,
    href: 'https://viananails.com/producto/curso-sistema-dual/',
  },
]

export default function FeaturedCourses({ onAddToCart }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {FEATURED.map(course => (
            <article key={course.id} className="group flex flex-col">
              {/* Image */}
              <div className="overflow-hidden rounded-xl mb-5 aspect-square bg-viana-cream">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Name */}
              <h3 className="font-body font-semibold text-viana-dark text-lg mb-1 text-center">
                {course.name}
              </h3>

              {/* Price */}
              <p className="text-center text-sm text-gray-500 mb-4">
                {course.priceFrom}€ – {course.priceTo}€
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href={course.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-center text-sm"
                >
                  Leer más
                </a>
                {onAddToCart && (
                  <button
                    onClick={() => onAddToCart({
                      id: course.id,
                      name: course.name,
                      image: course.image,
                      priceFrom: course.priceFrom,
                      priceTo: course.priceTo,
                      type: 'presencial',
                      shortDesc: '',
                      options: ['Con Kit', 'Sin Kit'],
                    })}
                    className="btn-primary text-sm text-center"
                  >
                    Reservar Plaza
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
