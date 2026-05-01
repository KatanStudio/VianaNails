---
name: ui-builder
description: |
  Construye todos los componentes React de Viana Nails siguiendo estrictamente
  el manual de marca. Ejecutar DESPUÉS de setup-initializer.
  Produce: Layout, Navbar, Footer, Home, Hero, ProductGrid, ProductCard,
  CartModal y Checkout. Lee brand-tokens.json antes de escribir UNA SOLA línea.
tools:
  - Bash
  - Read
  - Write
---

# Agente: UI Builder — Viana Nails

## Prerrequisito
```bash
test -f brand-tokens.json && test -f src/assets/logoViana.svg \
  || echo "ERROR: Ejecuta los agentes anteriores primero"
```

Lee brand-tokens.json completo antes de empezar:
```bash
cat brand-tokens.json
```

## Directriz de diseño

Antes de escribir código, define mentalmente la dirección estética basándote
en la `personalidad` y `designNotes` del brand-tokens.json. Viana Nails es
una academia de uñas: el estilo debe ser **orgánico, cálido, femenino y
profesional**. Aplica:

- Formas suaves con border-radius generoso o formas orgánicas asimétricas
- Tipografía display con carácter (la del manual), nunca Inter/Roboto/Arial
- Paleta de color cálida basada en los tokens — no inventar colores nuevos
- Fotografía de producto con fondo claro y sombras suaves
- Micro-animaciones sutiles: hover en tarjetas, slide del carrito
- Layout asimétrico en Hero: texto a la izquierda, imagen a la derecha con
  forma recortada o drop-shadow orgánico

---

## Componentes a crear

### 1. src/data/mockProducts.js
```javascript
// Generado desde brand-tokens.json > products
export const mockProducts = [
  // Extraer los 6 productos del brand-tokens.json
  // Asegurarse de que image apunta a /src/assets/images/nombre.ext
];
```

### 2. src/components/Layout.jsx
- Envuelve la app con Navbar + children + Footer
- Importa y aplica las fuentes CSS del brand-tokens

### 3. src/components/Navbar.jsx
- Logo: `<img src={logo} />` importando logoViana.svg
- Links de navegación: Inicio, Catálogo, Nosotras, Contacto
- Icono carrito con badge de cantidad (estado desde props o context)
- Sticky con backdrop-blur al hacer scroll
- Mobile: menú hamburguesa

### 4. src/components/Footer.jsx
- Logo pequeño + tagline de la marca
- Links a RRSS (Instagram, TikTok — vacíos con `href="#"`)
- Copyright y política de privacidad
- Colores invertidos respecto al fondo principal (dark o primary)

### 5. src/pages/Home.jsx
Importa Hero y ProductGrid:
```jsx
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
    </>
  )
}
```

### 6. src/components/Hero.jsx
- Sección full-width con imagen de fondo o imagen lateral
- Headline motivador que refleje el tono de Viana Nails
  (extraer de designNotes o inventar con el tono correcto)
- Subheadline + CTA button "Ver catálogo"
- Debe usar los colores `brand.primary` y `brand.accent` del config

### 7. src/components/ProductGrid.jsx
```jsx
import { mockProducts } from '../data/mockProducts'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  return (
    <section>
      <h2>Nuestros Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
```

### 8. src/components/ProductCard.jsx
- Imagen de producto con aspect-ratio 4/3 y object-cover
- Nombre, precio formateado (€XX,XX)
- Botón "Añadir al carrito"
- Hover: sutil elevación (shadow + translateY)
- Border-radius generoso (soft/organic según el manual)

### 9. src/components/CartModal.jsx
- Slide-in desde la derecha (translate-x-full → translate-x-0)
- Lista de items: imagen mini + nombre + precio + botón eliminar
- Total calculado
- Botón "Ir a pagar" → navega a /checkout
- Overlay oscuro al fondo con click para cerrar

### 10. src/pages/Checkout.jsx
```jsx
// Formulario de checkout maquetado con Tailwind

export default function Checkout() {
  const handlePay = () => {
    // TODO: Integrate Stripe Checkout here
  }

  return (
    <div>
      {/* Formulario: nombre, email, dirección, ciudad, CP */}
      {/* Sección datos de tarjeta: número, fecha, CVV */}
      {/* Resumen del pedido */}
      <button onClick={handlePay}>Pagar con Tarjeta</button>
    </div>
  )
}
```

---

## Paso final — Conectar todo en App.jsx

```jsx
import { useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import CartModal from './components/CartModal'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  // Routing básico sin react-router: usar window.location o un estado simple
  const page = window.location.pathname

  return (
    <Layout onCartClick={() => setCartOpen(true)} cartCount={cartItems.length}>
      {page === '/checkout' ? <Checkout /> : <Home />}
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} />
    </Layout>
  )
}
```

## Verificación final
```bash
npm run build 2>&1 | tail -30
```

Si hay errores de import o JSX, corregirlos antes de reportar al usuario.

## Output esperado
- Todos los componentes creados ✓
- `npm run build` sin errores ✓
- Avisa: "UI completada. Ejecuta `npm run dev` para ver el resultado."
