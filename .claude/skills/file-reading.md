---
name: file-reading
description: "Router para leer cualquier tipo de archivo correctamente. Usar siempre antes de intentar leer un archivo desconocido. Cubre: .docx, .csv, .xlsx, .pdf, imágenes, archivos ZIP."
---

# File Reading — Protocolo de lectura segura

## Regla de oro
**Nunca hagas `cat` sobre un binario.** Siempre identifica el tipo primero.

## Dispatch por extensión

| Extensión | Primer movimiento |
|-----------|------------------|
| `.docx`   | `extract-text archivo.docx` |
| `.csv`    | `pandas` con `nrows=10` primero |
| `.xlsx`   | `extract-text archivo.xlsx` |
| `.pdf`    | `pdfinfo` + `pdftotext` |
| `.jpg/.png/.svg` | Inspección visual o `file` |
| `.zip`    | `unzip -l` para listar, nunca extraer todo |

## CSV — el más común en este proyecto

```python
import pandas as pd

# SIEMPRE empezar con una muestra
df = pd.read_csv('assets_temporales/productos.csv', nrows=10)
print("Columnas:", df.columns.tolist())
print("Tipos:", df.dtypes)
print(df.head(5))
```

Contar filas sin cargar todo:
```bash
wc -l assets_temporales/productos.csv
```

Cargar completo solo si hace falta:
```python
df_full = pd.read_csv('assets_temporales/productos.csv')
print(f"Total productos: {len(df_full)}")
```

Problemas comunes con CSV en español:
```python
# Encoding incorrecto → añadir encoding
df = pd.read_csv('productos.csv', encoding='latin-1')  # o 'utf-8-sig'

# Separador punto y coma (formato europeo)
df = pd.read_csv('productos.csv', sep=';')

# Precios con coma decimal → normalizar
df['precio'] = df['precio'].str.replace(',', '.').astype(float)
```

## Imágenes — auditoría de la carpeta

```bash
# Listar imágenes con tamaño
ls -lh assets_temporales/*.{jpg,jpeg,png,webp,svg} 2>/dev/null

# Identificar tipo real de cada archivo
file assets_temporales/*

# Ver dimensiones de imágenes
python3 -c "
from PIL import Image
import os, glob
for f in glob.glob('assets_temporales/*.{jpg,png,webp}'):
    try:
        img = Image.open(f)
        print(f'{os.path.basename(f)}: {img.size} {img.mode}')
    except:
        print(f'{f}: ERROR al leer')
"
```

## DOCX — ver skill docx-reader.md para detalle completo

```bash
extract-text assets_temporales/brandinform.docx | head -200
```

## Archivos desconocidos

```bash
file assets_temporales/nombre_archivo
```

Si `file` devuelve "data" o algo inesperado, no intentes abrirlo y avisa al usuario.
