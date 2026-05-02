import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../api/client'

const PASSWORD_RULES = [
  { label: 'Al menos 8 caracteres', test: v => v.length >= 8 },
  { label: 'Una mayúscula', test: v => /[A-Z]/.test(v) },
  { label: 'Una minúscula', test: v => /[a-z]/.test(v) },
  { label: 'Un número', test: v => /\d/.test(v) },
  { label: 'Un carácter especial (!@#$%...)', test: v => /[!@#$%^&*()\-_=+{};:,<.>]/.test(v) },
]

const ROLE_LABELS = { admin: 'Admin', cliente: 'Cliente', empleado: 'Empleado' }
const ROLE_COLORS = {
  admin: 'bg-purple-100 text-purple-700',
  cliente: 'bg-blue-100 text-blue-700',
  empleado: 'bg-amber-100 text-amber-700',
}

const EMPTY_FORM = { name: '', email: '', phone: '', role: 'cliente', password: '' }

export default function UsuariosPanel() {
  const { accessToken } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      const data = await apiFetch('/users', accessToken)
      setUsers(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setForm(EMPTY_FORM)
    setFormError(null)
    setEditing(null)
    setModal('create')
  }

  function openEdit(user) {
    setForm({ name: user.name, email: user.email, phone: user.phone ?? '', role: user.role, password: '' })
    setFormError(null)
    setEditing(user)
    setModal('edit')
  }

  function closeModal() {
    setModal(null)
    setEditing(null)
    setFormError(null)
  }

  async function handleSave() {
    setSaving(true)
    setFormError(null)
    try {
      if (modal === 'create') {
        await apiFetch('/users', accessToken, {
          method: 'POST',
          body: JSON.stringify(form),
        })
      } else {
        const { password, ...rest } = form
        await apiFetch(`/users/${editing._id}`, accessToken, {
          method: 'PATCH',
          body: JSON.stringify(rest),
        })
      }
      await load()
      closeModal()
    } catch (e) {
      setFormError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(user) {
    try {
      await apiFetch(`/users/${user._id}`, accessToken, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !user.isActive }),
      })
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u))
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-viana-dark">Usuarios</h1>
          <p className="font-body text-sm text-gray-400 mt-0.5">{users.length} usuarios registrados</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-viana-pink text-white text-sm font-body font-medium rounded-xl hover:bg-viana-dark transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo usuario
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24 text-gray-400 font-body text-sm">Cargando...</div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm font-body px-4 py-3 rounded-xl">{error}</div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Nombre</th>
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Email</th>
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Rol</th>
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-viana-dark">{u.name}</td>
                  <td className="px-5 py-3.5 text-gray-500">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${ROLE_COLORS[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                      {ROLE_LABELS[u.role] ?? u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${u.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                      {u.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-viana-pink hover:bg-viana-cream rounded-lg transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => toggleActive(u)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          u.isActive
                            ? 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {u.isActive ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <UserModal
          mode={modal}
          form={form}
          setForm={setForm}
          onSave={handleSave}
          onClose={closeModal}
          saving={saving}
          error={formError}
        />
      )}
    </div>
  )
}

function UserModal({ mode, form, setForm, onSave, onClose, saving, error }) {
  const field = (name, value) => setForm(f => ({ ...f, [name]: value }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="font-display text-lg text-viana-dark">
            {mode === 'create' ? 'Nuevo usuario' : 'Editar usuario'}
          </h2>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-body px-3 py-2.5 rounded-xl">{error}</div>
          )}

          <FormField label="Nombre">
            <input
              type="text"
              value={form.name}
              onChange={e => field('name', e.target.value)}
              placeholder="Nombre completo"
              className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
            />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              value={form.email}
              onChange={e => field('email', e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
            />
          </FormField>

          <FormField label="Teléfono">
            <input
              type="tel"
              value={form.phone}
              onChange={e => field('phone', e.target.value)}
              placeholder="+34 600 000 000"
              className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
            />
          </FormField>

          <FormField label="Rol">
            <select
              value={form.role}
              onChange={e => field('role', e.target.value)}
              className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition bg-white"
            >
              <option value="cliente">Cliente</option>
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
            </select>
          </FormField>

          {mode === 'create' && (
            <FormField label="Contraseña">
              <input
                type="password"
                value={form.password}
                onChange={e => field('password', e.target.value)}
                placeholder="Contraseña segura"
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
              <ul className="mt-2 flex flex-col gap-1">
                {PASSWORD_RULES.map(r => {
                  const ok = r.test(form.password)
                  return (
                    <li key={r.label} className={`flex items-center gap-1.5 text-xs font-body ${ok ? 'text-emerald-600' : 'text-gray-400'}`}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        {ok
                          ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        }
                      </svg>
                      {r.label}
                    </li>
                  )
                })}
              </ul>
            </FormField>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-body font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-body font-medium bg-viana-pink text-white rounded-xl hover:bg-viana-dark transition-colors disabled:opacity-60"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}
