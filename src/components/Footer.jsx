import logo from '../assets/logoViana.svg'

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-viana-dark text-white">
      {/* Gradient top strip */}
      <div className="h-1 bg-viana-gradient" />

      {/* CTA Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <button
          onClick={() => onNavigate('formacion')}
          className="group relative overflow-hidden flex items-center justify-center py-10 px-8 text-center"
        >
          <div className="absolute inset-0 bg-viana-gradient opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          <span className="relative font-body font-bold text-white text-sm sm:text-base uppercase tracking-widest z-10">
            CONOCE NUESTRA FORMACIÓN PRESENCIAL
          </span>
        </button>
        <button
          onClick={() => onNavigate('academia')}
          className="group relative overflow-hidden flex items-center justify-center py-10 px-8 text-center"
        >
          <div className="absolute inset-0 bg-viana-dark group-hover:bg-viana-dark/80 transition-colors duration-300" />
          <span className="relative font-body font-bold text-white text-sm sm:text-base uppercase tracking-widest z-10">
            DESCUBRE NUESTRA ACADEMIA ONLINE
          </span>
        </button>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <img src={logo} alt="Viana Nails" className="h-16 w-auto brightness-0 invert mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Academia de uñas y belleza en Toledo. Formación presencial y online con grupos reducidos, productos de alta calidad y mucho amor por el oficio.
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="https://www.instagram.com/viananails_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-viana-pink transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/viananails"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-viana-pink transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-body font-semibold text-white mb-4 text-xs uppercase tracking-widest">Navegación</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { label: 'Cursos',          page: 'cursos' },
              { label: 'Galería',         page: 'galeria' },
              { label: 'Registro',        page: 'registro' },
              { label: 'Contacto',        page: 'contacto' },
            ].map(l => (
              <li key={l.label}>
                <button onClick={() => onNavigate(l.page)} className="hover:text-viana-pink transition-colors text-left">
                  {l.label}
                </button>
              </li>
            ))}
            {[
              { label: 'Política de Cookies', href: 'https://viananails.com/politica-de-cookies/' },
              { label: 'Aviso Legal',         href: 'https://viananails.com/aviso-legal/' },
            ].map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-viana-pink transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body font-semibold text-white mb-4 text-xs uppercase tracking-widest">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-viana-pink" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span>Calle Las lomas 22<br />45162 Noez, Toledo</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-viana-pink" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <a href="tel:+34609338229" className="hover:text-viana-pink transition-colors">609 33 82 29</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-viana-pink" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <a href="mailto:Reservas@viananails.com" className="hover:text-viana-pink transition-colors">
                Reservas@viananails.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} Viana Nails. Todos los derechos reservados.</span>
        <div className="flex gap-4">
          <a href="https://viananails.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Privacidad</a>
          <a href="https://viananails.com/aviso-legal/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Aviso Legal</a>
          <a href="https://viananails.com/politica-de-cookies/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
