export const projects = [
  {
    id: 1,
    title: 'Digital Care',
    description:
      'Plataforma web para soporte técnico, mantenimiento y contacto profesional. Incluye diseño responsive, sección de servicios y formularios de contacto. Roadmap: panel de administración y blog técnico.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js (plan)', 'MySQL (plan)'],
    category: 'web',
    links: [
      { label: 'Ver proyecto', href: 'https://digitalcaregt.github.io', primary: true, icon: 'FaExternalLinkAlt' },
      { label: 'Repositorio', href: 'https://github.com/davexdev', primary: false, icon: 'FaGithub' },
    ],
    cover: '/chart-clientes.jpg',
    coverAlt: 'Dashboard de clientes para Digital Care',
  },
  {
    id: 2,
    title: 'Torre de Hanoi',
    description:
      'Mini juego con interfaz drag & drop, contador de movimientos y solución automática basada en recursividad. Demuestra habilidades en algoritmos y frontend interactivo.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Algoritmos'],
    category: 'juego',
    links: [
      { label: 'Probar demo', href: 'https://davexdev.github.io/hanoi.html', primary: true, icon: 'FaPlayCircle' },
      { label: 'Código', href: 'https://github.com/davexdev/davexdev.github.io', primary: false, icon: 'FaCode' },
    ],
    cover: '/hanoi-cover.jpg',
    coverAlt: 'Demo interactiva Torre de Hanoi',
  },
  {
    id: 3,
    title: 'ETL System – Reportes',
    description:
      'Módulo profesional de análisis de datos en Jakarta EE (JSP/Servlets) con reportes dinámicos, gráficas interactivas con Chart.js y exportación a PDF y CSV.',
    tags: ['Jakarta EE 10', 'PostgreSQL', 'Bootstrap 5', 'Chart.js', 'PDFBox'],
    category: 'datos',
    links: [
      { label: 'Ver en GitHub', href: 'https://github.com/davexdev/etl-system', primary: true, icon: 'FaGithub' },
    ],
    cover: '/chart-productos.jpg',
    coverAlt: 'Dashboard de productos y análisis',
  },
  {
    id: 4,
    title: 'Snake Game',
    description:
      'Juego web clásico tipo Snake, desarrollado en JavaScript puro, con controles táctiles para móvil y soporte para teclado WASD/flechas.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
    category: 'juego',
    links: [
      { label: 'Probar demo', href: 'https://davexdev.github.io/snake.html', primary: true, icon: 'FaPlayCircle' },
      { label: 'Código', href: 'https://github.com/DavexDev/DavexDev.github.io', primary: false, icon: 'FaCode' },
    ],
    cover: '/nake-cover.jpg',
    coverAlt: 'Juego Snake clásico',
  },
]
