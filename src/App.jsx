import { useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Cursos from './pages/Cursos'
import Galeria from './pages/Galeria'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Contacto from './pages/Contacto'
import CartModal from './components/CartModal'

const CURSOS_FILTER = { formacion: 'Presencial', academia: 'Online', proximos: 'Próximos Servicios' }

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [cursosFilter, setCursosFilter] = useState('Todos')
  const [currency, setCurrency] = useState('EUR')

  function navigate(p) {
    if (CURSOS_FILTER[p]) {
      setCursosFilter(CURSOS_FILTER[p])
      setPage('cursos')
    } else {
      if (p === 'cursos') setCursosFilter('Todos')
      setPage(p)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function addToCart(product) {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  function removeFromCart(id) {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  function updateQty(id, qty) {
    if (qty < 1) return removeFromCart(id)
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <Layout
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigate}
        currentPage={page}
        currency={currency}
        onCurrencyChange={setCurrency}
      >
        {page === 'home' && <Home onAddToCart={addToCart} onNavigate={navigate} />}
        {page === 'cursos' && <Cursos key={cursosFilter} onAddToCart={addToCart} onNavigate={navigate} initialFilter={cursosFilter} currency={currency} />}
        {page === 'galeria' && <Galeria onNavigate={navigate} />}
        {page === 'login' && <Login onNavigate={navigate} />}
        {page === 'registro' && <Registro onNavigate={navigate} />}
        {page === 'contacto' && <Contacto onNavigate={navigate} />}
        {page === 'checkout' && <Checkout cartItems={cartItems} onNavigate={navigate} />}
      </Layout>

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onCheckout={() => { setCartOpen(false); navigate('checkout') }}
        currency={currency}
      />
    </>
  )
}
