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
              Mi nombre es <strong className="text-viana-dark">Trinidad Viana</strong>, fundadora de la academia Viananails.
              A continuación, dejo un resumen de cómo y cuándo nace este proyecto.
            </p>
            <p>
              Viananails nace por hobby y pasión por las uñas, después de mucho tiempo compaginando este arte con un trabajo aparte,
              tomamos la decisión de cumplir un sueño y luchar por él. Comenzamos este maravilloso camino hace unos años
              y hoy día es nuestra forma de vida.
            </p>
            <p>
              En este proyecto todas las formadoras estamos en continuo aprendizaje y así poder enseñar todas y cada una de las
              nuevas técnicas que van surgiendo. Aquí encontramos personal que, ante todo, os transmiten armonía, profesionalidad
              y garantía de que todas las técnicas adquiridas las aprenderás de la mejor forma posible.
            </p>
            <p>
              Nos gusta involucrarnos con cada una de nuestras alumnas, ya que nosotros en algún momento hemos sido o seguimos
              siendo alumnas. Nuestro sello de identidad es la <strong className="text-viana-dark">humildad y transparencia</strong> en
              cada paso que damos.
            </p>
            <p>
              Si, al igual que yo, deseas emprender en el magnífico mundo de las uñas, estaremos encantados de caminar a tu lado
              y poder ayudarte cada día a conseguirlo. <strong className="text-viana-dark">¡Confía en ti y lucha por tus sueños!</strong>
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
