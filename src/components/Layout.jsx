import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, cartCount, onCartOpen, onNavigate, currentPage, currency, onCurrencyChange }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        cartCount={cartCount}
        onCartOpen={onCartOpen}
        onNavigate={onNavigate}
        currentPage={currentPage}
        currency={currency}
        onCurrencyChange={onCurrencyChange}
      />
      <main className="flex-1 pt-0">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
