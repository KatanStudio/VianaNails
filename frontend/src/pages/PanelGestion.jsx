import { useState } from 'react'
import UsuariosPanel from './panel/UsuariosPanel'
import CursosPanel from './panel/CursosPanel'

const SECTIONS = [
  {
    id: 'usuarios',
    label: 'Usuarios',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    id: 'cursos',
    label: 'Cursos',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
]

export default function PanelGestion({ onNavigate }) {
  const [section, setSection] = useState('usuarios')

  return (
    <div className="flex h-[calc(100vh-60px)] mt-[60px] bg-gray-50">

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="px-5 py-5 border-b border-gray-100">
          <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">Admin</p>
          <h2 className="font-display text-lg text-viana-dark leading-tight">Panel de Gestión</h2>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-colors text-left ${
                section === s.id
                  ? 'bg-viana-cream text-viana-pink'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-viana-dark'
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-body text-gray-400 hover:text-viana-pink hover:bg-gray-50 transition-colors w-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Volver al sitio
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {section === 'usuarios' && <UsuariosPanel />}
        {section === 'cursos'   && <CursosPanel />}
      </main>
    </div>
  )
}
