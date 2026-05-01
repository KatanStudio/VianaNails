import { useEffect } from 'react'
import { formatPrice } from '../utils/currency'

export default function CartModal({ isOpen, onClose, items, onRemove, onUpdateQty, onCheckout, currency = 'EUR' }) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const subtotal = items.reduce((sum, i) => sum + i.priceFrom * i.qty, 0)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Carrito de compra"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-display text-2xl text-viana-dark">Tu Carrito</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-viana-cream flex items-center justify-center">
                <svg className="w-10 h-10 text-viana-pink" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <div>
                <p className="font-body font-semibold text-viana-dark">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400 mt-1">Añade un curso para comenzar</p>
              </div>
              <button onClick={onClose} className="btn-primary text-sm">Explorar Servicios</button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map(item => (
                <li key={item.id} className="py-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0 bg-viana-cream"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-viana-dark text-sm leading-snug truncate">{item.name}</p>
                    <span className={`text-xs font-body px-2 py-0.5 rounded-full mt-1 inline-block ${
                      item.type === 'online' ? 'bg-viana-dark text-white' : 'bg-viana-cream text-viana-dark'
                    }`}>
                      {item.type === 'online' ? 'Online' : 'Presencial'}
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors"
                        >−</button>
                        <span className="font-body text-sm font-medium w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors"
                        >+</button>
                      </div>
                      <span className="gradient-text font-bold font-body text-sm">
                        {formatPrice(item.priceFrom * item.qty, currency)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="self-start text-gray-300 hover:text-red-400 transition-colors"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between font-body">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-bold text-viana-dark text-lg">{formatPrice(subtotal, currency)}</span>
            </div>
            <button onClick={onCheckout} className="btn-primary w-full text-center">
              Finalizar Reserva
            </button>
            <button onClick={onClose} className="w-full text-center text-sm font-body text-gray-400 hover:text-viana-dark transition-colors py-1">
              Seguir explorando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
