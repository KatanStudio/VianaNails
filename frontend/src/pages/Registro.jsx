import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const BANNER = 'https://viananails.com/wp-content/uploads/2022/09/booking-title-image-1.jpg'

const PASSWORD_RULES = [
  { id: 'len',     label: 'Mínimo 8 caracteres',        test: p => p.length >= 8 },
  { id: 'upper',   label: 'Una letra mayúscula',         test: p => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'Una letra minúscula',         test: p => /[a-z]/.test(p) },
  { id: 'number',  label: 'Un número',                   test: p => /\d/.test(p) },
  { id: 'special', label: 'Un carácter especial (!@#…)', test: p => /[!@#$%^&*()\-_=+{};:,<.>]/.test(p) },
]

function passwordStrong(p) {
  return PASSWORD_RULES.every(r => r.test(p))
}

export default function Registro({ onNavigate }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ nombre: '', apellidos: '', email: '', password: '', confirm: '', privacy: false })
  const [errors, setErrors]     = useState({})
  const [serverError, setServerError] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [pwFocused, setPwFocused] = useState(false)

  function validate() {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Campo requerido'
    if (!form.email.trim()) e.email = 'Campo requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.password) e.password = 'Campo requerido'
    else if (!passwordStrong(form.password)) e.password = 'La contraseña no cumple los requisitos'
    if (form.password !== form.confirm) e.confirm = 'Las contraseñas no coinciden'
    if (!form.privacy) e.privacy = 'Debes aceptar la política de privacidad'
    return e
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
    setServerError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setServerError(null)
    try {
      const name = [form.nombre, form.apellidos].filter(Boolean).join(' ')
      await register(name, form.email, form.password)
      setSubmitted(true)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-viana-cream flex items-center justify-center px-4 pt-20">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-viana-gradient flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-display text-3xl text-viana-dark mb-3">¡Bienvenida!</h2>
          <p className="font-body text-gray-500 mb-6">Tu cuenta ha sido creada correctamente. Ya puedes acceder a todos nuestros cursos.</p>
          <button onClick={() => onNavigate('cursos')} className="btn-primary w-full">
            Explorar Servicios
          </button>
        </div>
      </div>
    )
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
          <p className="font-body text-viana-pink font-medium text-sm uppercase tracking-widest mb-3">Únete a la comunidad</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide">Registro</h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-viana-gradient" />
        </div>
      </div>

      {/* Form */}
      <section className="py-20 bg-viana-cream">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-display text-2xl text-viana-dark mb-6 text-center">Crear cuenta</h2>

            {serverError && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="font-body text-sm text-red-600">{serverError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-viana-dark mb-1">Nombre *</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={e => handleChange('nombre', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition ${errors.nombre ? 'border-red-400' : 'border-gray-200'}`}
                    placeholder="Trinidad"
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-viana-dark mb-1">Apellidos</label>
                  <input
                    type="text"
                    value={form.apellidos}
                    onChange={e => handleChange('apellidos', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition"
                    placeholder="Viana"
                  />
                </div>
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
                <label className="block font-body text-sm font-medium text-viana-dark mb-1">Contraseña *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  onFocus={() => setPwFocused(true)}
                  onBlur={() => setPwFocused(false)}
                  className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Crea una contraseña segura"
                />
                {(pwFocused || form.password) && (
                  <ul className="mt-2 space-y-1">
                    {PASSWORD_RULES.map(rule => {
                      const ok = rule.test(form.password)
                      return (
                        <li key={rule.id} className={`flex items-center gap-1.5 text-xs font-body transition-colors ${ok ? 'text-green-500' : 'text-gray-400'}`}>
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            {ok
                              ? <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            }
                          </svg>
                          {rule.label}
                        </li>
                      )
                    })}
                  </ul>
                )}
                {errors.password && !pwFocused && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-viana-dark mb-1">Confirmar contraseña *</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={e => handleChange('confirm', e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm text-viana-dark outline-none focus:ring-2 focus:ring-viana-pink/50 transition ${errors.confirm ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Repite la contraseña"
                />
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
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

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full text-center transition-opacity ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creando cuenta…' : 'Crear cuenta'}
              </button>
            </form>

            <p className="mt-6 text-center font-body text-sm text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-viana-pink hover:underline font-medium"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
