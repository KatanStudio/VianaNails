import { useState } from 'react'

const BANNER = 'https://viananails.com/wp-content/uploads/2022/09/booking-title-image-1.jpg'

export default function Login({ onNavigate }) {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.email.trim()) e.email = 'Campo requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.password) e.password = 'Campo requerido'
    return e
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    // TODO: Integrate authentication here
    setTimeout(() => setLoading(false), 1200)
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
          <p className="font-body text-viana-pink font-medium text-sm uppercase tracking-widest mb-3">Bienvenida de nuevo</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide">Iniciar sesión</h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
        </div>
      </div>

      {/* Form */}
      <section className="py-20 bg-viana-cream">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-display text-2xl text-viana-dark mb-6 text-center">Accede a tu cuenta</h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label className="block font-body text-sm font-medium text-viana-dark mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-viana-dark mb-1">Contraseña *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex justify-end">
                <a
                  href="https://viananails.com/mi-cuenta/lost-password/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs text-gray-400 hover:text-viana-pink transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full text-center transition-opacity ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Entrando…' : 'Entrar'}
              </button>
            </form>

            {/* Register link */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="font-body text-sm text-gray-500">
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => onNavigate('registro')}
                  className="text-viana-pink hover:underline font-medium"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
