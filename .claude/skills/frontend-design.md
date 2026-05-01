---
name: frontend-design
description: "Guía de diseño frontend para crear interfaces React con identidad visual fuerte. Usar para todos los componentes de Viana Nails. Prohíbe explícitamente patrones genéricos de IA."
---

# Frontend Design — Viana Nails

## Filosofía de diseño

Antes de escribir UNA SOLA línea de JSX, define la dirección estética y
comprométete con ella. Para Viana Nails la dirección es:

**Orgánico · Cálido · Femenino · Artesanal · Profesional**

Esto se traduce en:
- Formas redondeadas o asimétricas, nunca cajas rectangulares duras
- Colores del manual de marca — nunca inventar colores nuevos
- Tipografía del manual — nunca Inter, Roboto, Arial o system fonts
- Fotografía con fondos claros y sombras suaves
- Espaciado generoso, sin aglomeraciones

## Lo que NUNCA hacer

❌ `font-family: Inter, system-ui` — es la señal de IA genérica  
❌ Gradientes morados sobre blanco  
❌ Cards rectangulares con border-radius: 4px  
❌ Botones con fondo azul `#3B82F6`  
❌ Layouts de cuadrícula simétrica perfecta sin jerarquía visual  
❌ Sombras `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` — demasiado sutil  

## Patrones recomendados para Viana Nails

### Colores
Siempre usar las variables CSS del brand-tokens:
```css
background-color: var(--color-primary);
color: var(--color-text);
```
En Tailwind: `bg-brand-primary`, `text-brand-text`, etc.

### Tipografía
```css
h1, h2 { font-family: var(--font-display); }
p, span { font-family: var(--font-body); }
```
En Tailwind: `font-display`, `font-body`

### Formas orgánicas
```css
/* Border radius orgánico para imágenes destacadas */
.organic-shape {
  border-radius: 60% 40% 70% 30% / 40% 60% 30% 70%;
}
/* Soft para cards */
.soft-card {
  border-radius: 1.5rem;
}
```

### Hover en ProductCard
```jsx
<div className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
```

### Animación de entrada (staggered)
```jsx
// Usar animation-delay en cada card para efecto escalonado
<div style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
```

### CartModal slide-in
```jsx
<div className={`
  fixed right-0 top-0 h-full w-80 bg-white shadow-2xl
  transform transition-transform duration-300 ease-out
  ${open ? 'translate-x-0' : 'translate-x-full'}
`}>
```

## Estructura de componente recomendada

```jsx
// Siempre: nombre descriptivo, props tipadas con comentario, export default al final
export default function ProductCard({ product }) {
  const { title, price, description, image } = product

  return (
    <article className="
      bg-brand-surface rounded-soft overflow-hidden
      transition-all duration-300
      hover:-translate-y-2 hover:shadow-xl
      group cursor-pointer
    ">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-brand-text">{title}</h3>
        <p className="font-body text-sm text-brand-muted mt-1">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-xl text-brand-accent">
            {price.toFixed(2)}€
          </span>
          <button className="
            px-4 py-2 rounded-full
            bg-brand-primary text-white font-body text-sm
            hover:bg-brand-accent transition-colors duration-200
          ">
            Añadir
          </button>
        </div>
      </div>
    </article>
  )
}
```

## Hero — directrices específicas

El Hero debe:
1. Ocupar al menos 80vh
2. Tener imagen a la derecha con clip-path o border-radius orgánico
3. Headline en font-display con al menos 4xl
4. CTA button con fondo `brand.accent`, texto blanco, border-radius full
5. Un elemento decorativo sutil (punto, línea, forma geométrica pequeña) en brand.secondary

```jsx
// Estructura básica del Hero
<section className="min-h-[85vh] flex items-center relative overflow-hidden bg-brand-bg">
  {/* Elemento decorativo */}
  <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full bg-brand-secondary/10 blur-3xl" />

  <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Texto */}
    <div className="z-10">
      <h1 className="font-display text-5xl lg:text-7xl text-brand-text leading-tight">
        {/* Headline motivador desde designNotes */}
      </h1>
      <p className="font-body text-lg text-brand-muted mt-6 max-w-md">
        {/* Subheadline */}
      </p>
      <button className="mt-8 px-8 py-4 rounded-full bg-brand-accent text-white font-body hover:shadow-lg transition-shadow">
        Ver catálogo
      </button>
    </div>

    {/* Imagen */}
    <div className="relative">
      <img
        src="..."
        alt="Viana Nails"
        className="w-full object-cover rounded-[40%_60%_60%_40%/60%_30%_70%_40%]"
      />
    </div>
  </div>
</section>
```

## Checklist antes de entregar

- [ ] ¿Usas las fuentes del manual, no Inter/Roboto?
- [ ] ¿Todos los colores son variables CSS del brand-tokens?
- [ ] ¿Las cards tienen border-radius ≥ 1rem?
- [ ] ¿El hover de las cards tiene transición suave?
- [ ] ¿El CartModal tiene animación slide-in?
- [ ] ¿`npm run build` compila sin errores?
- [ ] ¿El responsive funciona en mobile (< 640px)?
