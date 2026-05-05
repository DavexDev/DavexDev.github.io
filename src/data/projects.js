export const projects = [
  {
    id: 101,
    title: 'Enervisa',
    description:
      'Sitio corporativo para empresa del sector energetico en Guatemala, enfocado en comunicar servicios de generacion, transmision y distribucion electrica, mostrar proyectos ejecutados y facilitar el contacto comercial.',
    outcome:
      'Proyecto destacado por su identidad visual fuerte, estructura comercial clara y enfoque institucional orientado a confianza.',
    tags: ['Web corporativa', 'Sector energia', 'Lead generation', 'Brand presence'],
    category: 'web',
    featured: true,
    badge: 'Destacado',
    coverEyebrow: 'Energia del futuro',
    coverCaption: 'Servicios tecnicos, proyectos y contacto comercial.',
    coverClass: 'project-cover--energy',
    cover: '/enervia-cover.jpg',
    coverAlt: 'Sitio web Enervisa - sector energético Guatemala',
    links: [
      { label: 'Ver sitio', href: 'https://enervia.com.gt/', primary: true, icon: 'FaExternalLinkAlt' },
    ],
  },
  {
    id: 102,
    title: 'Restaurante Las Tejas',
    description:
      'Web comercial para restaurante orientada a reservas, pedidos en linea y promocion de experiencias gastronomicas, eventos y espacios del negocio.',
    outcome:
      'Caso fuerte de conversion con llamados a la accion visibles para ordenar, reservar y contactar.',
    tags: ['WordPress', 'Reservas', 'Pedidos online', 'Hospitality UX'],
    category: 'web',
    badge: 'Cliente',
    coverEyebrow: 'Experiencia gastronomica',
    coverCaption: 'Reservas, eventos y pedidos en una sola experiencia.',
    coverClass: 'project-cover--restaurant',
    cover: '/tejas-cover.jpg',
    coverAlt: 'Sitio web Restaurante Las Tejas - Chiquimula Guatemala',
    links: [
      { label: 'Ver sitio', href: 'https://lastejasrestaurante.com/', primary: true, icon: 'FaExternalLinkAlt' },
    ],
  },
  {
    id: 103,
    title: 'SCADA',
    description:
      'Sitio corporativo para empresa de control y automatizacion industrial, construido en WordPress y planteado para una futura migracion a Laravel.',
    outcome:
      'Proyecto profesional con enfoque en servicios tecnicos, testimonios, FAQ y evolucion posterior hacia una base mas escalable.',
    tags: ['WordPress', 'Automatizacion', 'Industrial', 'Migracion a Laravel'],
    category: 'web',
    badge: 'En evolucion',
    coverEyebrow: 'Control y automatizacion',
    coverCaption: 'Servicios industriales con base actual en WordPress.',
    coverClass: 'project-cover--industrial',
    cover: '/scada-cover.jpg',
    coverAlt: 'Sitio web SCADA - control y automatización industrial',
    links: [
      { label: 'Ver sitio', href: 'https://scada.com.gt/', primary: true, icon: 'FaExternalLinkAlt' },
    ],
  },
  {
    id: 1,
    title: 'Digital Care',
    description:
      'Sitio web comercial para negocio de soporte técnico e informática en Guatemala. Comunica servicios de mantenimiento, ensambles, soporte técnico, asesorías y seguridad digital. Incluye atención a domicilio y contacto directo por WhatsApp y redes sociales.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Sitio comercial'],
    category: 'web',
    links: [
      { label: 'Ver proyecto', href: 'https://digitalcaregt.github.io', primary: true, icon: 'FaExternalLinkAlt' },
      { label: 'Repositorio', href: 'https://github.com/davexdev', primary: false, icon: 'FaGithub' },
    ],
    cover: '/digitalcare-cover.jpg',
    coverAlt: 'Sitio web Digital Care - soporte técnico e informática Guatemala',
    coverPosition: 'center 55%',
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
