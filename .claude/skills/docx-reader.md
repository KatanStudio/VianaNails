---
name: docx
description: "Leer, analizar y extraer contenido de archivos .docx (Word). Usar cuando necesites extraer texto, tablas, estilos o metadatos de un documento Word. Para este proyecto: brandinform.docx contiene el manual de marca."
---

# DOCX — Lectura y análisis

## Método principal: extract-text

```bash
extract-text ruta/al/archivo.docx
```

Produce markdown limpio con headings, negrita, listas, tablas y enlaces.
Es el método más rápido y fiable para extraer contenido textual.

## Método alternativo: pandoc

```bash
pandoc archivo.docx -t plain -o salida.txt
```

## Método de último recurso: desempaquetar ZIP

Un .docx es un ZIP. Si los métodos anteriores fallan:

```bash
cp archivo.docx archivo.zip
unzip archivo.zip -d docx_unpacked/
cat docx_unpacked/word/document.xml
```

El XML es verbose pero contiene todo el texto en nodos `<w:t>`.

## Extracción Python limpia

```python
import zipfile
from lxml import etree

WORD_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

with zipfile.ZipFile('brandinform.docx') as z:
    xml = z.read('word/document.xml')

tree = etree.fromstring(xml)
paragraphs = tree.findall(f'.//{{{WORD_NS}}}p')

for p in paragraphs:
    texts = p.findall(f'.//{{{WORD_NS}}}t')
    line = ''.join(t.text or '' for t in texts)
    if line.strip():
        print(line)
```

## Extraer colores del documento

Los colores en .docx están en el XML como atributos `w:color val="RRGGBB"`:

```python
import zipfile, re
from lxml import etree

WORD_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

with zipfile.ZipFile('assets_temporales/brandinform.docx') as z:
    xml = z.read('word/document.xml')

# Buscar colores hex en el XML
colores = set(re.findall(r'[0-9A-Fa-f]{6}', xml.decode('utf-8', errors='ignore')))
# Filtrar los que sean realmente colores (excluir IDs y timestamps)
colores_validos = [c for c in colores if len(c) == 6 and not c.startswith('000000')]
print("Colores encontrados:", colores_validos)
```

## Extraer fuentes del documento

```python
import zipfile
from lxml import etree

with zipfile.ZipFile('assets_temporales/brandinform.docx') as z:
    # Las fuentes están en word/fontTable.xml
    try:
        fonts_xml = z.read('word/fontTable.xml')
        tree = etree.fromstring(fonts_xml)
        ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
        fonts = tree.findall(f'.//{{{ns}}}font')
        for f in fonts:
            name = f.get(f'{{{ns}}}name')
            if name:
                print(f"Fuente: {name}")
    except KeyError:
        print("No se encontró fontTable.xml")
```

## Notas importantes

- Los colores en brandinform.docx pueden estar como hex, CMYK o nombres de color
- Si están en CMYK, convertir con: R=255×(1-C)×(1-K), G=255×(1-M)×(1-K), B=255×(1-Y)×(1-K)
- Las fuentes pueden ser Adobe Fonts (Typekit) — verificar disponibilidad en Google Fonts
- Si una fuente no está en Google Fonts, buscar el equivalente más cercano disponible
