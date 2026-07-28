# Deyvi Joel Xol — Portafolio

Portafolio personal de **Deyvi Joel Xol (DavexDev)** — Desarrollador Web Jr. y Técnico de Soporte, estudiante de Ingeniería en Sistemas en Guatemala.

**🔗 Sitio en vivo:** [davexdev.github.io](https://davexdev.github.io/)

## ✨ Qué incluye

- **Proyectos** — trabajo real en producción (Enervisa, SCADA, PIUMS, Restaurante Las Tejas, Parqueo El Roble) y proyectos académicos/personales.
- **CyberRisk Predictor GT 2026** — dashboard interactivo de regresión lineal aplicada a ciberseguridad, con carga de dataset CSV en tiempo real.
- **Mini juegos jugables** — Torre de Hanoi (con solución automática recursiva) y Snake, hechos en React.
- Secciones de habilidades, educación, certificaciones y contacto.
- Tema claro/oscuro, animaciones con Framer Motion/GSAP y diseño responsive.

## 🛠️ Stack

React 18 · Vite 6 · React Router (HashRouter) · Framer Motion · GSAP · Lenis · Plotly.js (carga dinámica) · react-icons

## 🚀 Desarrollo local

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción a dist/
npm run preview   # sirve el build localmente
```

## 📦 Despliegue

El sitio se publica con **GitHub Pages** desde `main:/docs`. Cada release se compila con `npm run build` y el contenido de `dist/` se sincroniza manualmente a `docs/` antes de hacer commit y push a `main`.

Las páginas pesadas (CyberRisk, Hanoi, Snake) se cargan con `React.lazy` para no afectar el tamaño del bundle principal del portafolio.
