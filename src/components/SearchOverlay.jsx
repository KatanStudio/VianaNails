import { useState, useEffect, useRef } from 'react'
import presencialCourses from '../data/presencialCourses'
import onlineCourses from '../data/onlineCourses'

const ALL = [...presencialCourses, ...onlineCourses]

function formatPrice(n) {
  return n % 1 === 0 ? `${n}€` : `${n.toFixed(2).replace('.', ',')}€`
}

export default function SearchOverlay({ isOpen, onClose, onNavigate }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  const results = q.trim().length >= 2
    ? ALL.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(q.toLowerCase()))
      )
    : []

  useEffect(() => {
    if (isOpen) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleResultClick(product) {
    onNavigate(product.type === 'presencial' ? 'formacion' : 'academia')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] bg-white/96 backdrop-blur-sm flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 sm:px-8 py-5 border-b border-gray-100 max-w-3xl mx-auto w-full">
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Buscar cursos…"
          className="flex-1 font-body text-lg text-viana-dark placeholder:text-gray-300 outline-none bg-transparent"
        />
        <button
          onClick={onClose}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="Cerrar búsqueda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full px-4 sm:px-8 py-6">
        {q.trim().length < 2 ? (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="font-body text-gray-400">Escribe al menos 2 caracteres para buscar</p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['manicura', 'acrílico', 'gel', 'online', 'pestañas'].map(term => (
                <button
                  key={term}
                  onClick={() => setQ(term)}
                  className="px-3 py-1.5 rounded-full bg-viana-cream font-body text-sm text-gray-600 hover:bg-viana-pink/10 hover:text-viana-pink transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-gray-400">No se encontraron cursos para <strong className="text-viana-dark">"{q}"</strong></p>
            <button
              onClick={() => { onNavigate('cursos'); onClose() }}
              className="mt-4 btn-outline text-sm"
            >
              Ver todos los cursos
            </button>
          </div>
        ) : (
          <div>
            <p className="font-body text-xs text-gray-400 uppercase tracking-widest mb-4">
              {results.length} resultado{results.length !== 1 ? 's' : ''} para "{q}"
            </p>
            <ul className="space-y-2">
              {results.map(product => (
                <li key={product.id}>
                  <button
                    onClick={() => handleResultClick(product)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-viana-cream transition-colors text-left group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-viana-dark text-sm group-hover:text-viana-pink transition-colors leading-snug">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-body px-2 py-0.5 rounded-full ${
                          product.type === 'online' ? 'bg-viana-dark text-white' : 'bg-viana-cream text-viana-dark'
                        }`}>
                          {product.type === 'online' ? 'Online' : 'Presencial'}
                        </span>
                        <span className="text-xs font-body text-gray-400">
                          {product.originalPrice
                            ? <><span className="gradient-text font-semibold">{formatPrice(product.priceFrom)}</span> <span className="line-through">{formatPrice(product.originalPrice)}</span></>
                            : product.priceFrom === product.priceTo
                            ? <span className="gradient-text font-semibold">{formatPrice(product.priceFrom)}</span>
                            : <span className="gradient-text font-semibold">Desde {formatPrice(product.priceFrom)}</span>
                          }
                        </span>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-viana-pink transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
