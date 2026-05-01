import { useState } from 'react'
import ProductCard from './ProductCard'
import mockProducts from '../data/mockProducts'

const FILTERS = ['Todos', 'Presencial', 'Online']

export default function ProductGrid({ onAddToCart }) {
  const [filter, setFilter] = useState('Todos')

  const visible = filter === 'Todos'
    ? mockProducts
    : mockProducts.filter(p => p.type === filter.toLowerCase())

  return (
    <section id="cursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-viana-pink font-body font-medium text-sm uppercase tracking-widest">Formación profesional</span>
          <h2 className="font-display text-4xl sm:text-5xl text-viana-dark mt-2 mb-4">Nuestros Cursos</h2>
          <p className="font-body text-gray-500 max-w-xl mx-auto text-base">
            Aprende con profesionales, en grupos reducidos y con todos los materiales incluidos. Tu futuro empieza aquí.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body font-medium px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                filter === f
                  ? 'bg-viana-gradient text-white shadow-md'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="font-body text-gray-500 mb-4">¿Tienes dudas sobre qué curso es el ideal para ti?</p>
          <a
            href="https://viananails.com/contacto/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Habla con nosotras
          </a>
        </div>
      </div>
    </section>
  )
}
