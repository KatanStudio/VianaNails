import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, cartCount, onCartOpen, onNavigate, currentPage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        cartCount={cartCount}
        onCartOpen={onCartOpen}
        onNavigate={onNavigate}
        currentPage={currentPage}
      />
      <main className="flex-1 pt-0">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
