import Hero from '../components/Hero'
import QuienSoy from '../components/QuienSoy'
import InstagramSection from '../components/InstagramSection'

export default function Home({ onAddToCart, onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <QuienSoy onNavigate={onNavigate} />
      <InstagramSection />
    </>
  )
}
