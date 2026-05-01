import { useState, useEffect } from 'react'

function formatPrice(n) {
  return n % 1 === 0 ? `${n}€` : `${n.toFixed(2).replace('.', ',')}€`
}

export default function ProductOptionsModal({ product, isOpen, onClose, onAddToCart }) {
  const [selTipo, setSelTipo] = useState(null)
  const [selKit, setSelKit] = useState(null)
  const [imgError, setImgError] = useState(false)

  const variations = product?.variations ?? []
  const hasTipo = variations.some(v => v.tipo)
  const hasKit  = variations.some(v => v.kit)

  const tipos = hasTipo ? [...new Set(variations.map(v => v.tipo))] : []
  const kits  = hasKit  ? [...new Set(variations.map(v => v.kit))]  : []

  const selectedVariation = variations.find(v => {
    const tipoOk = !hasTipo || v.tipo === selTipo
    const kitOk  = !hasKit  || v.kit  === selKit
    return tipoOk && kitOk
  }) ?? null

  const isComplete = (!hasTipo || selTipo !== null) && (!hasKit || selKit !== null)

  useEffect(() => {
    if (!isOpen) {
      setSelTipo(null)
      setSelKit(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !product) return null

  function handleAdd() {
    if (!isComplete || !selectedVariation) return
    const label = [selTipo, selKit].filter(Boolean).join(' · ')
    onAddToCart({
      ...product,
      id: `${product.id}-${selectedVariation.id}`,
      priceFrom: selectedVariation.price,
      priceTo: selectedVariation.price,
      selectedLabel: label,
      name: `${product.name}${label ? ` — ${label}` : ''}`,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-display text-xl text-viana-dark">Selecciona tu opción</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* Product summary */}
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-viana-cream flex-shrink-0">
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-viana-gradient opacity-30" />
              )}
            </div>
            <div>
              <p className="font-body text-xs text-viana-pink font-semibold uppercase tracking-wide mb-1">Presencial</p>
              <h3 className="font-display text-lg text-viana-dark leading-snug">{product.name}</h3>
              <p className="font-body text-xs text-gray-400 mt-0.5">
                Desde <span className="text-viana-pink font-semibold">{formatPrice(product.priceFrom)}</span>
              </p>
            </div>
          </div>

          {/* Tipo selector */}
          {hasTipo && (
            <div>
              <p className="font-body text-sm font-semibold text-viana-dark mb-3">
                ¿Qué quieres hacer?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {tipos.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelTipo(t)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-body font-semibold transition-all duration-150 text-center ${
                      selTipo === t
                        ? 'border-viana-pink bg-viana-pink/5 text-viana-pink'
                        : 'border-gray-200 text-gray-600 hover:border-viana-pink/50'
                    }`}
                  >
                    {t === 'Reservar' ? '📅 Reservar plaza' : '✅ Comprar curso'}
                  </button>
                ))}
              </div>
              {selTipo === 'Reservar' && (
                <p className="mt-2 font-body text-xs text-gray-400">
                  Reserva tu plaza con una señal. El resto se abona el día del curso.
                </p>
              )}
              {selTipo === 'Comprar' && (
                <p className="mt-2 font-body text-xs text-gray-400">
                  Pago completo del curso. Plazas garantizadas.
                </p>
              )}
            </div>
          )}

          {/* Kit selector */}
          {hasKit && (
            <div>
              <p className="font-body text-sm font-semibold text-viana-dark mb-3">
                ¿Con kit de materiales?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {kits.map(k => (
                  <button
                    key={k}
                    onClick={() => setSelKit(k)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-body font-semibold transition-all duration-150 text-center ${
                      selKit === k
                        ? 'border-viana-pink bg-viana-pink/5 text-viana-pink'
                        : 'border-gray-200 text-gray-600 hover:border-viana-pink/50'
                    }`}
                  >
                    {k === 'Con Kit' ? '🧰 Con Kit' : '🖐️ Sin Kit'}
                  </button>
                ))}
              </div>
              {selKit === 'Con Kit' && (
                <p className="mt-2 font-body text-xs text-gray-400">
                  Incluye todos los materiales necesarios para el curso.
                </p>
              )}
              {selKit === 'Sin Kit' && (
                <p className="mt-2 font-body text-xs text-gray-400">
                  Trae tus propios materiales. Consulta la lista con nosotras.
                </p>
              )}
            </div>
          )}

          {/* Price preview */}
          <div className={`rounded-xl p-4 transition-all duration-200 ${
            isComplete && selectedVariation
              ? 'bg-viana-cream'
              : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-gray-500">Total</span>
              {isComplete && selectedVariation ? (
                <span className="font-display text-2xl gradient-text">
                  {formatPrice(selectedVariation.price)}
                </span>
              ) : (
                <span className="font-body text-sm text-gray-400">
                  {!hasTipo && !selTipo ? '' : (!selTipo && hasTipo) ? 'Selecciona una opción' : (!selKit && hasKit) ? 'Selecciona una opción' : '—'}
                  {!selTipo && hasTipo && 'Elige Reservar o Comprar'}
                  {selTipo && !selKit && hasKit && 'Elige Con Kit o Sin Kit'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleAdd}
            disabled={!isComplete}
            className={`w-full py-3.5 rounded-xl font-body font-bold text-sm transition-all duration-200 ${
              isComplete
                ? 'btn-primary'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isComplete ? 'Añadir al carrito' : 'Selecciona todas las opciones'}
          </button>
        </div>
      </div>
    </div>
  )
}
