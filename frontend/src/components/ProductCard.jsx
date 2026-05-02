import { useState } from 'react'
import ProductOptionsModal from './ProductOptionsModal'
import { formatPrice } from '../utils/currency'

export default function ProductCard({ product, onAddToCart, currency = 'EUR' }) {
  const [imgError, setImgError] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const isVariable = Array.isArray(product.variations) && product.variations.length > 0

  const badgeColors = {
    'Más Popular': 'bg-viana-gradient text-white',
    'Online': 'bg-viana-gold/20 text-viana-dark',
    '¡Oferta!': 'bg-red-500 text-white',
  }

  function handleDirectAdd() {
    onAddToCart({ ...product, priceFrom: product.priceFrom, priceTo: product.priceFrom })
  }

  return (
    <>
      <article className="bg-white rounded-2xl overflow-hidden shadow-md card-hover flex flex-col h-full">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-viana-cream">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-viana-gradient opacity-30">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}

          {/* Type badge */}
          <span className={`absolute top-3 left-3 text-xs font-body font-semibold px-3 py-1 rounded-full ${
            product.type === 'online'
              ? 'bg-viana-dark text-white'
              : 'bg-white/90 text-viana-dark'
          }`}>
            {product.type === 'online' ? 'Online' : 'Presencial'}
          </span>

          {product.badge && (
            <span className={`absolute top-3 right-3 text-xs font-body font-semibold px-3 py-1 rounded-full ${badgeColors[product.badge] || 'bg-white text-viana-dark'}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display text-xl text-viana-dark mb-2 leading-snug">{product.name}</h3>
          <p className="font-body text-sm text-gray-500 leading-relaxed mb-4 flex-1">{product.shortDesc}</p>

          {/* Price */}
          <div className="mb-4">
            {product.originalPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold gradient-text">{formatPrice(product.priceFrom, currency)}</span>
                <span className="text-sm font-normal text-gray-400 line-through">{formatPrice(product.originalPrice, currency)}</span>
              </div>
            ) : isVariable ? (
              <div>
                <span className="text-2xl font-bold gradient-text">{formatPrice(product.priceFrom, currency)}</span>
                {product.priceFrom !== product.priceTo && (
                  <span className="text-sm font-normal text-gray-400 ml-1">– {formatPrice(product.priceTo, currency)}</span>
                )}
              </div>
            ) : product.priceFrom === product.priceTo ? (
              <span className="text-2xl font-bold gradient-text">{formatPrice(product.priceFrom, currency)}</span>
            ) : (
              <span className="text-2xl font-bold gradient-text">
                {formatPrice(product.priceFrom, currency)}
                <span className="text-sm font-normal text-gray-400 ml-1">– {formatPrice(product.priceTo, currency)}</span>
              </span>
            )}
          </div>

          {/* CTA button */}
          {isVariable ? (
            <button
              onClick={() => setModalOpen(true)}
              className="btn-outline w-full text-center text-sm"
            >
              Seleccionar opciones
            </button>
          ) : product.type === 'online' ? (
            <button
              onClick={handleDirectAdd}
              className="btn-primary w-full text-center text-sm"
            >
              Añadir al Carrito
            </button>
          ) : (
            <button
              onClick={handleDirectAdd}
              className="btn-primary w-full text-center text-sm"
            >
              Añadir al carrito
            </button>
          )}
        </div>
      </article>

      <ProductOptionsModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={onAddToCart}
        currency={currency}
      />
    </>
  )
}
