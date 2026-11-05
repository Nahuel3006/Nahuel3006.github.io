# Portfolio | Sergio Nahuel Solveira

Portfolio personal estático desarrollado con HTML, CSS y JavaScript puro.

**[Ver demo en vivo](https://nahuel3006.github.io/)**

## Características
- Diseño responsive (mobile-first)
- Modo claro/oscuro con persistencia en localStorage
- Versión en español e inglés
- Navegación activa con IntersectionObserver
- Menú móvil accesible
- Sin dependencias ni proceso de build

## Tecnologías
- HTML5
- CSS3 (Custom Properties, Grid/Flexbox)
- JavaScript Vanilla

## Estructura
- `index.html` - Versión en español
- `en/` - Versión en inglés
- `cv/` - CV en PDF para descarga: `Nahuel-Solveira-CV-ES.pdf` desde la página en español y `Nahuel-Solveira-CV-EN.pdf` desde la página en inglés
- `styles.css` - Estilos y variables de tema
- `script.js` - Tema, menú móvil y navegación activa
- `sitemap.xml` - Mapa del sitio

## Desarrollo local
Abrir con un servidor estático. Ejemplo:
```bash
npx serve .
# o
python -m http.server 8000
```
