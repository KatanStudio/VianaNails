const BASE = 'https://viananails.com/wp-content/uploads'

// Captions and images as shown on the original site
const POSTS = [
  {
    id: 1,
    image: `${BASE}/2023/06/InCollage_20230618_105633290.jpg`,
    caption: 'Cambio y avanzando.... Gracias Gema por tan buen rato 💅',
    href: 'https://www.instagram.com/viananails_/',
  },
  {
    id: 2,
    image: `${BASE}/2023/06/InCollage_20230104_224525951-scaled.jpg`,
    caption: 'Estructuras en acrílico 🌸 domina la técnica con nosotras',
    href: 'https://www.instagram.com/viananails_/',
  },
  {
    id: 3,
    image: `${BASE}/2023/06/InCollage_20230618_105354788-scaled.jpg`,
    caption: 'Una experiencia de formación especializada que cambia tu vida 💕',
    href: 'https://www.instagram.com/viananails_/',
  },
  {
    id: 4,
    image: `${BASE}/2023/06/InCollage_20230618_105258011-scaled.jpg`,
    caption: 'La manicura tiene historia... ¿sabías que viene del Antiguo Egipto? 🏺',
    href: 'https://www.instagram.com/viananails_/',
  },
  {
    id: 5,
    image: `${BASE}/2023/06/InCollage_20230618_105507801-scaled.jpg`,
    caption: 'Diseños de salón para cada época del año 🍂✨',
    href: 'https://www.instagram.com/viananails_/',
  },
  {
    id: 6,
    image: `${BASE}/2023/08/20231130_145250-1-scaled.jpg`,
    caption: 'Formación con conciencia: alergias ambientales en nuestros cursos 🌿',
    href: 'https://www.instagram.com/viananails_/',
  },
]

const IG_PROFILE = 'https://www.instagram.com/viananails_/'

export default function InstagramSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-viana-dark tracking-wide">
            <strong>SÍGUENOS EN INSTAGRAM</strong>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {POSTS.map(post => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-viana-cream block"
              aria-label={post.caption}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={e => {
                  e.target.parentElement.style.background = 'linear-gradient(135deg,#e24a71,#f7bc58)'
                  e.target.style.display = 'none'
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-viana-dark/0 group-hover:bg-viana-dark/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-3">
                  {/* Instagram icon */}
                  <svg className="w-8 h-8 text-white mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <p className="text-white text-xs leading-snug line-clamp-2">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Síguenos en Instagram
          </a>
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-center"
          >
            Ver más
          </a>
        </div>
      </div>
    </section>
  )
}
