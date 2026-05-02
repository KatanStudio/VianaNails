import { useState } from 'react'

const BANNER = 'https://viananails.com/wp-content/uploads/2022/09/about-title-image-1.jpg'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '', privacy: false })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Campo requerido'
    if (!form.email.trim()) e.email = 'Campo requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.mensaje.trim()) e.mensaje = 'Campo requerido'
    if (!form.privacy) e.privacy = 'Debes aceptar la política de privacidad'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setSubmitted(true)
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  return (
    <>
      {/* Page Header */}
      <div className="relative bg-viana-dark overflow-hidden">
        <img
          src={BANNER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-viana-dark/50 to-viana-dark/80" />
        <div className="relative z-10 pt-36 pb-16 text-center max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-body text-viana-pink font-medium text-sm uppercase tracking-widest mb-3">Estamos aquí para ayudarte</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide">Contacto</h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
        </div>
      </div>

      <section className="py-20 bg-viana-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center py-8">
                <div className="w-16 h-16 rounded-full bg-viana-gradient flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-viana-dark mb-2">¡Mensaje enviado!</h3>
                <p className="font-body text-gray-500">Nos pondremos en contacto contigo lo antes posible. Gracias por escribirnos.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl text-viana-dark mb-6">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label className="block font-body text-sm font-medium text-viana-dark mb-1">Nombre *</label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={e => handleChange('nombre', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition ${errors.nombre ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-viana-dark mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-viana-dark mb-1">Mensaje *</label>
                    <textarea
                      rows={5}
                      value={form.mensaje}
                      onChange={e => handleChange('mensaje', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition resize-none ${errors.mensaje ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                    {errors.mensaje && <p className="text-red-500 text-xs mt-1">{errors.mensaje}</p>}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.privacy}
                        onChange={e => handleChange('privacy', e.target.checked)}
                        className="mt-0.5 accent-viana-pink"
                      />
                      <span className="font-body text-sm text-gray-500">
                        He leído y acepto la{' '}
                        <a href="https://viananails.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer" className="text-viana-pink hover:underline">
                          Política de Privacidad
                        </a>
                      </span>
                    </label>
                    {errors.privacy && <p className="text-red-500 text-xs mt-1">{errors.privacy}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full text-center">
                    Enviar mensaje
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-viana-dark mb-6">Información de contacto</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-viana-gradient flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-viana-dark text-sm">Dirección</p>
                    <p className="font-body text-gray-500 text-sm mt-1">Calle Las lomas 22<br />45162 Noez, Toledo</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-viana-gradient flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-viana-dark text-sm">Teléfono</p>
                    <a href="tel:+34609338229" className="font-body text-gray-500 text-sm mt-1 hover:text-viana-pink transition-colors block">
                      609 33 82 29
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-viana-gradient flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-viana-dark text-sm">Email</p>
                    <a href="mailto:Reservas@viananails.com" className="font-body text-gray-500 text-sm mt-1 hover:text-viana-pink transition-colors block">
                      Reservas@viananails.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social + WhatsApp */}
            <div>
              <p className="font-body font-semibold text-viana-dark text-sm mb-4">Síguenos</p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://wa.me/34609338229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 text-sm font-body font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/viananails_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-viana-pink hover:bg-viana-pink/80 text-white rounded-full px-4 py-2 text-sm font-body font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/viananails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-body font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a
                  href="mailto:Reservas@viananails.com"
                  className="flex items-center gap-2 bg-viana-dark hover:bg-viana-dark/80 text-white rounded-full px-4 py-2 text-sm font-body font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  Email
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-viana-cream rounded-2xl p-6">
              <p className="font-body font-semibold text-viana-dark text-sm mb-3">Horario de atención</p>
              <ul className="space-y-1 font-body text-sm text-gray-500">
                <li className="flex justify-between"><span>Lunes – Viernes</span><span>9:00 – 20:00</span></li>
                <li className="flex justify-between"><span>Sábados</span><span>10:00 – 14:00</span></li>
                <li className="flex justify-between"><span>Domingos</span><span>Cerrado</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
