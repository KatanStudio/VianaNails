---
name: setup-initializer
description: |
  Inicializa el proyecto React+Vite+Tailwind y gestiona los assets.
  Ejecutar DESPUÉS de brand-analyst (requiere brand-tokens.json).
  Se encarga de: inicializar el proyecto, configurar Tailwind con los tokens
  de marca, limpiar assets_temporales y migrar los archivos correctos a src/assets/.
tools:
  - Bash
  - Read
  - Write
---

# Agente: Setup & Asset Manager — Viana Nails

## Prerrequisito
Verifica que existe `brand-tokens.json` antes de continuar:
```bash
test -f brand-tokens.json || echo "ERROR: Ejecuta brand-analyst primero"
```

## Paso 1 — Inicializar proyecto Vite + React

```bash
npm create vite@latest . -- --template react --force
```

Instalar dependencias base:
```bash
npm install
```

Instalar Tailwind CSS v3 (forzar v3 para compatibilidad con tailwind.config.js):
```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

## Paso 2 — Limpiar assets_temporales

**Eliminar logos rasterizados** (conservar SOLO el SVG):
```bash
# Eliminar PNG y JPG del logotipo
find assets_temporales/ -maxdepth 1 \( -name "*logo*" -o -name "*Logo*" -o -name "*LOGO*" \) \
  \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -delete

# Verificar que el SVG está intacto
ls -la assets_temporales/logoViana.svg
```

**Auditar fotos de productos** — conservar las que tienen correspondencia en
brand-tokens.json > products[].image, eliminar el resto de duplicados o
imágenes sin uso claro:
```bash
# Listar todo lo que queda
ls -la assets_temporales/
```
Elimina solo archivos cuyo nombre NO aparece en ningún campo `image` del
brand-tokens.json y que sean claramente duplicados o de baja calidad
(archivos _thumb, _copy, _bak, versiones antiguas con sufijo numérico cuando
ya existe una versión sin sufijo).

**NUNCA eliminar** el SVG del logo ni imágenes de productos listadas en brand-tokens.json.

## Paso 3 — Crear estructura de directorios

```bash
mkdir -p src/components src/pages src/data src/assets/images
```

## Paso 4 — Migrar assets al proyecto

```bash
# Logo SVG → src/assets/
cp assets_temporales/logoViana.svg src/assets/

# Imágenes de productos → src/assets/images/
# Copiar todas las imágenes restantes en assets_temporales que sean producto
for img in assets_temporales/*.{jpg,jpeg,png,webp,svg}; do
  [ -f "$img" ] && [ "$(basename $img)" != "logoViana.svg" ] && cp "$img" src/assets/images/
done
```

## Paso 5 — Configurar tailwind.config.js

Lee brand-tokens.json y genera la configuración:

```javascript
// tailwind.config.js — generado desde brand-tokens.json
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SUSTITUIR con valores reales de brand-tokens.json
        brand: {
          primary:    'var(--color-primary)',
          secondary:  'var(--color-secondary)',
          accent:     'var(--color-accent)',
          bg:         'var(--color-background)',
          surface:    'var(--color-surface)',
          text:       'var(--color-text)',
          muted:      'var(--color-text-muted)',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        accent:  ['var(--font-accent)', 'sans-serif'],
      },
      borderRadius: {
        'organic': '60% 40% 70% 30% / 40% 60% 30% 70%',
        'soft':    '2rem',
      }
    },
  },
  plugins: [],
}
```

## Paso 6 — Inyectar CSS variables en src/index.css

```css
/* Leer colores desde brand-tokens.json e inyectar aquí */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary:     #VALOR_DE_BRAND_TOKENS;
    --color-secondary:   #VALOR_DE_BRAND_TOKENS;
    --color-accent:      #VALOR_DE_BRAND_TOKENS;
    --color-background:  #VALOR_DE_BRAND_TOKENS;
    --color-surface:     #VALOR_DE_BRAND_TOKENS;
    --color-text:        #VALOR_DE_BRAND_TOKENS;
    --color-text-muted:  #VALOR_DE_BRAND_TOKENS;
    --font-display: 'FUENTE_DE_BRAND_TOKENS';
    --font-body:    'FUENTE_DE_BRAND_TOKENS';
    --font-accent:  'FUENTE_DE_BRAND_TOKENS';
  }
}
```

Añadir el `@import` de Google Fonts al `<head>` de index.html usando la URL
de `brand-tokens.json > typography.googleFontsUrl`.

## Paso 7 — Verificar compilación base
```bash
npm run build 2>&1 | tail -20
```

## Output esperado
- Proyecto Vite inicializado ✓
- Tailwind configurado con tokens de marca ✓
- Assets migrados a src/assets/ ✓
- `npm run build` sin errores ✓
- Avisa: "Setup completado. Listo para ui-builder."
