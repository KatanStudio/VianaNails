const PHOTO = 'https://viananails.com/wp-content/uploads/2022/09/about-title-image-1.jpg'

export default function QuienSoy({ onNavigate }) {
  return (
    <section className="py-20 bg-viana-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl sm:text-5xl text-viana-dark tracking-wide">
            ¿QUIÉN SOY?
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1 space-y-5 font-body text-gray-600 leading-relaxed">
            <p>
              Hola, soy <strong className="text-viana-dark">Trinidad Viana</strong>, fundadora de Viana Nails.
              Nuestra academia nació de mi hobby y mi pasión por las uñas, con la ilusión de compartir todo lo
              aprendido con personas que, como yo, sueñan con dedicarse a este maravilloso mundo.
            </p>
            <p>
              En Viana Nails nos implicamos con cada alumna porque hemos estado en su lugar. Sabemos lo que es
              empezar desde cero, sin experiencia, y convertirlo en una profesión que llena de satisfacción.
            </p>
            <p>
              Nuestro sello de identidad es la <strong className="text-viana-dark">humildad y la transparencia</strong> en
              cada paso que damos. Trabajamos con grupos reducidos, productos de alta calidad y una formación continua
              para estar siempre a la vanguardia.
            </p>
            <p>
              Si sueñas con emprender en el mundo de las uñas, este es tu sitio. Te esperamos con los brazos abiertos.
            </p>

            <div className="pt-4">
              <button onClick={() => onNavigate && onNavigate('contacto')} className="btn-primary">
                Contactar
              </button>
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={PHOTO}
                  alt="Trinidad Viana – Fundadora de Viana Nails"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative gradient blob */}
              <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-2xl bg-viana-gradient opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
