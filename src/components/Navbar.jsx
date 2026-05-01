import { useState, useEffect, useRef } from 'react'
import logo from '../assets/logoViana.svg'
import SearchOverlay from './SearchOverlay'

const NAV_LINKS = [
  { label: 'Inicio',   page: 'home' },
  { label: 'Cursos',   page: 'cursos' },
  { label: 'Galería',  page: 'galeria' },
  { label: 'Contacto', page: 'contacto' },
]

const IG_URL = 'https://www.instagram.com/viananails_/'
const FB_URL = 'https://www.facebook.com/viananails'

function IgIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function FbIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export default function Navbar({ cartCount, onCartOpen, onNavigate, currentPage }) {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userOpen, setUserOpen]     = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close user dropdown on outside click
  useEffect(() => {
    if (!userOpen) return
    function handleOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [userOpen])

  function handleNav(page) {
    setMenuOpen(false)
    setUserOpen(false)
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? 'shadow-md py-1' : 'py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* LEFT: Logo + social icons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => handleNav('home')}
              aria-label="Viana Nails – Inicio"
            >
              <img src={logo} alt="Viana Nails" className="h-11 w-auto" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-viana-pink hover:bg-viana-cream transition-colors"
                aria-label="Instagram"
              >
                <IgIcon />
              </a>
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-viana-pink hover:bg-viana-cream transition-colors"
                aria-label="Facebook"
              >
                <FbIcon />
              </a>
            </div>
          </div>

          {/* CENTER: Nav links (desktop) */}
          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.page)}
                className={`text-xs font-body font-semibold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap ${
                  link.page === currentPage
                    ? 'text-viana-pink'
                    : 'text-viana-dark hover:text-viana-pink'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* RIGHT: Search, User, Cart, Hamburger */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-viana-pink hover:bg-viana-cream transition-colors"
              aria-label="Buscar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* User dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserOpen(o => !o)}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                  userOpen ? 'bg-viana-cream text-viana-pink' : 'text-gray-500 hover:text-viana-pink hover:bg-viana-cream'
                }`}
                aria-label="Cuenta"
                aria-expanded={userOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>

              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <a
                    href="https://viananails.com/mi-cuenta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-body text-gray-700 hover:bg-viana-cream hover:text-viana-pink transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Iniciar sesión
                  </a>
                  <button
                    onClick={() => { setUserOpen(false); handleNav('registro') }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body text-gray-700 hover:bg-viana-cream hover:text-viana-pink transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    Registrarse
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-viana-pink hover:bg-viana-cream transition-colors"
              aria-label="Abrir carrito"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white rounded-full bg-viana-gradient">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="xl:hidden w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-viana-cream transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menú"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.page)}
                className="text-left text-sm font-body font-semibold uppercase tracking-wide text-viana-dark hover:text-viana-pink transition-colors py-2.5 border-b border-gray-50"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 space-y-1">
              <a
                href="https://viananails.com/mi-cuenta/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2.5 text-sm font-body text-gray-600 hover:text-viana-pink border-b border-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                Iniciar sesión
              </a>
              <button
                onClick={() => handleNav('registro')}
                className="w-full flex items-center gap-3 py-2.5 text-sm font-body text-gray-600 hover:text-viana-pink border-b border-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                Registrarse
              </button>
            </div>
            <div className="flex gap-4 pt-3">
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-viana-pink transition-colors"><IgIcon /></a>
              <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-viana-pink transition-colors"><FbIcon /></a>
            </div>
          </div>
        )}
      </header>

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  )
}
