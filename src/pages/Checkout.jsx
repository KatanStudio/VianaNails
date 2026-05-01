import { useState } from 'react'
import logo from '../assets/logoViana.svg'

function formatPrice(n) {
  return n % 1 === 0 ? `${n}€` : `${n.toFixed(2).replace('.', ',')}€`
}

export default function Checkout({ cartItems, onNavigate }) {
  const [form, setForm] = useState({
    name: '', surname: '', email: '', phone: '',
    cardNumber: '', expiry: '', cvv: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const subtotal = cartItems.reduce((sum, i) => sum + i.priceFrom * i.qty, 0)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Integrate Stripe Checkout here
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-viana-cream flex items-center justify-center px-4 pt-20">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-viana-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-display text-3xl text-viana-dark mb-3">¡Reserva recibida!</h2>
          <p className="font-body text-gray-500 mb-8">
            Hemos recibido tu solicitud. Nos pondremos en contacto contigo en menos de 24 horas para confirmar tu plaza.
          </p>
          <button onClick={() => onNavigate('home')} className="btn-primary w-full text-center">
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-viana-cream pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-sm font-body text-gray-500 hover:text-viana-pink transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Volver a los cursos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-display text-2xl text-viana-dark mb-6">Datos personales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombre *</label>
                  <input
                    type="text" name="name" required value={form.name} onChange={handleChange}
                    placeholder="María"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Apellidos *</label>
                  <input
                    type="text" name="surname" required value={form.surname} onChange={handleChange}
                    placeholder="García López"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email *</label>
                  <input
                    type="email" name="email" required value={form.email} onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Teléfono *</label>
                  <input
                    type="tel" name="phone" required value={form.phone} onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Notas u observaciones</label>
                <textarea
                  name="notes" value={form.notes} onChange={handleChange}
                  placeholder="¿Tienes alguna pregunta o necesitas fecha específica?"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors resize-none"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-display text-2xl text-viana-dark mb-2">Pago con tarjeta</h2>
              <p className="font-body text-xs text-gray-400 mb-6">Transacción segura con cifrado SSL de 256 bits</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Número de tarjeta *</label>
                  <div className="relative">
                    <input
                      type="text" name="cardNumber" required value={form.cardNumber} onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body pr-12 focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Fecha de caducidad *</label>
                    <input
                      type="text" name="expiry" required value={form.expiry} onChange={handleChange}
                      placeholder="MM / AA"
                      maxLength={7}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">CVV *</label>
                    <input
                      type="text" name="cvv" required value={form.cvv} onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-viana-pink/40 focus:border-viana-pink transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full text-center mt-8 py-4 text-base">
                Pagar con Tarjeta · {formatPrice(subtotal || 0)}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span className="text-xs font-body">Pago 100% seguro</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <span className="text-xs font-body">SSL 256 bits</span>
              </div>
            </div>
          </form>

          {/* Order summary */}
          <aside className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="Viana Nails" className="h-10 w-auto" />
              </div>
              <h3 className="font-display text-xl text-viana-dark mb-4">Resumen del pedido</h3>

              {cartItems.length === 0 ? (
                <p className="text-sm font-body text-gray-400">No hay cursos en el carrito.</p>
              ) : (
                <ul className="divide-y divide-gray-100 mb-6">
                  {cartItems.map(item => (
                    <li key={item.id} className="py-3 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body font-medium text-viana-dark truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          {item.type === 'online' ? 'Online' : 'Presencial'} · ×{item.qty}
                        </p>
                      </div>
                      <span className="text-sm font-bold gradient-text flex-shrink-0">{formatPrice(item.priceFrom * item.qty)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm font-body text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-gray-500">
                  <span>IVA incluido</span>
                  <span>—</span>
                </div>
                <div className="flex justify-between font-body font-bold text-viana-dark text-lg pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="gradient-text">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-viana-cream rounded-xl">
                <p className="text-xs font-body text-gray-500 leading-relaxed">
                  <strong className="text-viana-dark">Política de reserva:</strong> El importe abonado reserva tu plaza. El resto se abona el día de la formación en el aula.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
