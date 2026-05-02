import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../api/client'

const TYPE_LABELS = { presencial: 'Presencial', online: 'Online' }
const TYPE_COLORS = {
  presencial: 'bg-rose-100 text-rose-700',
  online: 'bg-indigo-100 text-indigo-700',
}

const EMPTY_VARIATION = { tipo: 'Comprar', kit: 'Sin Kit', price: '' }

const EMPTY_FORM = {
  name: '',
  slug: '',
  type: 'presencial',
  shortDesc: '',
  description: '',
  priceFrom: '',
  priceTo: '',
  originalPrice: '',
  badge: '',
  image: '',
  order: 0,
  isActive: true,
  variations: [],
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function CursosPanel() {
  const { accessToken } = useAuth()
  const [courses, setCourses] = useState([])
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
      const data = await apiFetch('/courses', accessToken)
      setCourses(data)
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

  function openEdit(course) {
    setForm({
      name: course.name,
      slug: course.slug,
      type: course.type,
      shortDesc: course.shortDesc ?? '',
      description: course.description ?? '',
      priceFrom: course.priceFrom ?? '',
      priceTo: course.priceTo ?? '',
      originalPrice: course.originalPrice ?? '',
      badge: course.badge ?? '',
      image: course.image ?? '',
      order: course.order ?? 0,
      isActive: course.isActive,
      variations: course.variations?.map(v => ({ tipo: v.tipo, kit: v.kit, price: v.price })) ?? [],
    })
    setFormError(null)
    setEditing(course)
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
      const payload = {
        ...form,
        priceFrom: Number(form.priceFrom),
        priceTo: Number(form.priceTo),
        originalPrice: form.originalPrice !== '' ? Number(form.originalPrice) : undefined,
        order: Number(form.order),
        variations: form.variations.map(v => ({ ...v, price: Number(v.price) })),
      }
      if (modal === 'create') {
        await apiFetch('/courses', accessToken, { method: 'POST', body: JSON.stringify(payload) })
      } else {
        await apiFetch(`/courses/${editing._id}`, accessToken, { method: 'PATCH', body: JSON.stringify(payload) })
      }
      await load()
      closeModal()
    } catch (e) {
      setFormError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(course) {
    if (!confirm(`¿Desactivar el curso "${course.name}"?`)) return
    try {
      await apiFetch(`/courses/${course._id}`, accessToken, { method: 'DELETE' })
      setCourses(prev => prev.map(c => c._id === course._id ? { ...c, isActive: false } : c))
    } catch (e) {
      alert(e.message)
    }
  }

  async function handleRestore(course) {
    try {
      await apiFetch(`/courses/${course._id}`, accessToken, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: true }),
      })
      setCourses(prev => prev.map(c => c._id === course._id ? { ...c, isActive: true } : c))
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-viana-dark">Cursos</h1>
          <p className="font-body text-sm text-gray-400 mt-0.5">{courses.length} cursos en total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-viana-pink text-white text-sm font-body font-medium rounded-xl hover:bg-viana-dark transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo curso
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
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Tipo</th>
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Precio</th>
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Badge</th>
                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-viana-dark max-w-[200px] truncate">{c.name}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${TYPE_COLORS[c.type] ?? 'bg-gray-100 text-gray-600'}`}>
                      {TYPE_LABELS[c.type] ?? c.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {c.priceFrom === c.priceTo
                      ? `${c.priceFrom}€`
                      : `${c.priceFrom}€ – ${c.priceTo}€`
                    }
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{c.badge ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${c.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                      {c.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-viana-pink hover:bg-viana-cream rounded-lg transition-colors"
                      >
                        Editar
                      </button>
                      {c.isActive ? (
                        <button
                          onClick={() => handleDelete(c)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Desactivar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRestore(c)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          Activar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400 text-sm">
                    No hay cursos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <CourseModal
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

function CourseModal({ mode, form, setForm, onSave, onClose, saving, error }) {
  const field = (name, value) => setForm(f => ({ ...f, [name]: value }))

  function handleNameChange(value) {
    setForm(f => ({
      ...f,
      name: value,
      slug: mode === 'create' ? slugify(value) : f.slug,
    }))
  }

  function addVariation() {
    setForm(f => ({ ...f, variations: [...f.variations, { ...EMPTY_VARIATION }] }))
  }

  function removeVariation(i) {
    setForm(f => ({ ...f, variations: f.variations.filter((_, idx) => idx !== i) }))
  }

  function updateVariation(i, key, value) {
    setForm(f => ({
      ...f,
      variations: f.variations.map((v, idx) => idx === i ? { ...v, [key]: value } : v),
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-display text-lg text-viana-dark">
            {mode === 'create' ? 'Nuevo curso' : 'Editar curso'}
          </h2>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1 flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-body px-3 py-2.5 rounded-xl">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nombre" className="col-span-2">
              <input
                type="text"
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="Nombre del curso"
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>

            <FormField label="Slug">
              <input
                type="text"
                value={form.slug}
                onChange={e => field('slug', e.target.value)}
                placeholder="nombre-del-curso"
                className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>

            <FormField label="Tipo">
              <select
                value={form.type}
                onChange={e => field('type', e.target.value)}
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition bg-white"
              >
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
            </FormField>
          </div>

          <FormField label="Descripción corta">
            <input
              type="text"
              value={form.shortDesc}
              onChange={e => field('shortDesc', e.target.value)}
              placeholder="Resumen breve del curso"
              className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
            />
          </FormField>

          <FormField label="Descripción">
            <textarea
              value={form.description}
              onChange={e => field('description', e.target.value)}
              placeholder="Descripción completa del curso"
              rows={3}
              className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition resize-none"
            />
          </FormField>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Precio desde (€)">
              <input
                type="number"
                min="0"
                value={form.priceFrom}
                onChange={e => field('priceFrom', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>

            <FormField label="Precio hasta (€)">
              <input
                type="number"
                min="0"
                value={form.priceTo}
                onChange={e => field('priceTo', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>

            <FormField label="Precio original (€)">
              <input
                type="number"
                min="0"
                value={form.originalPrice}
                onChange={e => field('originalPrice', e.target.value)}
                placeholder="Opcional"
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Badge">
              <input
                type="text"
                value={form.badge}
                onChange={e => field('badge', e.target.value)}
                placeholder="Ej: Nuevo, Más vendido"
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>

            <FormField label="Imagen (URL)">
              <input
                type="text"
                value={form.image}
                onChange={e => field('image', e.target.value)}
                placeholder="/img/curso.jpg"
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>

            <FormField label="Orden">
              <input
                type="number"
                min="0"
                value={form.order}
                onChange={e => field('order', e.target.value)}
                className="w-full px-3 py-2 text-sm font-body border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink transition"
              />
            </FormField>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={form.isActive}
              onClick={() => field('isActive', !form.isActive)}
              className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors ${form.isActive ? 'bg-viana-pink' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform mt-0.5 ${form.isActive ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-sm font-body text-gray-600">Activo</span>
          </div>

          {/* Variaciones */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">
                Variaciones
              </label>
              <button
                type="button"
                onClick={addVariation}
                className="flex items-center gap-1 text-xs font-body font-medium text-viana-pink hover:text-viana-dark transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Añadir variación
              </button>
            </div>

            {form.variations.length === 0 && (
              <p className="text-xs font-body text-gray-400 py-2">Sin variaciones definidas.</p>
            )}

            <div className="flex flex-col gap-2">
              {form.variations.map((v, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2.5 rounded-xl">
                  <select
                    value={v.tipo}
                    onChange={e => updateVariation(i, 'tipo', e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs font-body border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink"
                  >
                    <option value="Comprar">Comprar</option>
                    <option value="Reservar">Reservar</option>
                  </select>
                  <select
                    value={v.kit}
                    onChange={e => updateVariation(i, 'kit', e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs font-body border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink"
                  >
                    <option value="Sin Kit">Sin Kit</option>
                    <option value="Con Kit">Con Kit</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={v.price}
                    onChange={e => updateVariation(i, 'price', e.target.value)}
                    placeholder="Precio €"
                    className="w-24 px-2 py-1.5 text-xs font-body border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viana-pink/30 focus:border-viana-pink"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariation(i)}
                    className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0 flex justify-end gap-3">
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

function FormField({ label, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs font-body font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}
