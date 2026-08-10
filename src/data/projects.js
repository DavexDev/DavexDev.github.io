export const projects = [
  {
    id: 101,
    title: 'Enervisa',
    collaborators: 'SCADA',
    description:
      'Plataforma corporativa para empresa de ingenieria electrica en Guatemala (generacion, transmision, subestaciones, solar fotovoltaica y mantenimiento predictivo). Incluye sitio publico y panel admin para gestionar servicios, galeria, mensajes y configuraciones dinamicas.',
    outcome:
      'Se entrego una solucion full web sobre Laravel 12 con contacto transaccional por Resend, miniaturas automaticas y estructura administrable sin depender de cambios directos en codigo.',
    tags: ['Laravel 12', 'Tailwind CSS', 'MySQL', 'Three.js', 'Resend'],
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
      { label: 'Repositorio', href: 'https://github.com/app-piums/Enervisa.git', primary: false, icon: 'FaGithub' },
    ],
  },
  {
    id: 102,
    title: 'Restaurante Las Tejas',
    collaborators: 'SCADA',
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
    collaborators: 'SCADA',
    description:
      'Plataforma SaaS para negocios en Guatemala enfocada en dominio + hosting + herramientas digitales en un solo flujo. Incluye sitio de marketing, panel admin (Filament) y panel cliente con modulos de dominios, ordenes y solicitud de demo para Cobros con WhatsApp.',
    outcome:
      'Evoluciono de una web corporativa hacia una propuesta de producto SaaS con arquitectura separada para SCADA y Cobros, integracion de ResellerClub para dominios y preparacion de pagos locales con Wompi.',
    tags: ['Laravel 13', 'Filament 4', 'ResellerClub API', 'Wompi', 'SaaS Guatemala'],
    category: 'web',
    badge: 'Evolucionado',
    coverEyebrow: 'Dominios, hosting y SaaS',
    coverCaption: 'SCADA + Cobros con enfoque comercial para Guatemala.',
    coverClass: 'project-cover--industrial',
    cover: '/EVOSCADA.jpeg',
    coverAlt: 'SCADA.com.gt - plataforma SaaS para negocios en Guatemala',
    links: [
      { label: 'Ver sitio', href: 'https://scada.com.gt/', primary: true, icon: 'FaExternalLinkAlt' },
      { label: 'Ver version anterior', href: 'https://seminario.apex.com.gt/scada/es', primary: false, icon: 'FaExternalLinkAlt' },
    ],
  },
  {
    id: 105,
    title: 'PIUMS Web Client & Artist',
    collaborators: 'PIUMS',
    description:
      'Doble aplicacion web en Next.js 14 (cliente y artista) con onboarding por rol, busqueda avanzada de artistas, flujo de booking, checkout, dashboards, agenda, mensajeria y ajustes operativos.',
    outcome:
      'Ya en produccion en piums.io. Experiencia end-to-end consolidada con integraciones del SDK y estabilidad en modulos criticos (booking, chat, filtros y onboarding).',
    tags: ['Next.js 14', 'Tailwind CSS', 'PiumsSDK', 'Stripe Checkout', 'Socket/Chat'],
    category: 'web',
    badge: 'En produccion',
    coverEyebrow: 'Web apps por rol',
    coverCaption: 'Cliente y artista con experiencia especializada.',
    coverClass: 'project-cover--energy',
    cover: '/piums-cover.png',
    coverAlt: 'Piuma - aplicacion web para clientes y artistas',
    links: [
      { label: 'Ver sitio', href: 'https://piums.io/', primary: true, icon: 'FaExternalLinkAlt' },
      { label: 'Ver avance', href: 'https://github.com/app-piums/piums-platform', primary: false, icon: 'FaGithub' },
    ],
  },
  {
    id: 106,
    title: 'PIUMS Mobile Apps',
    collaborators: 'PIUMS',
    description:
      'Ecosistema mobile nativo para cliente y artista en iOS y Android, alineado al flujo web de PIUMS: autenticacion, reservas, agenda, servicios, mensajeria y perfil.',
    outcome:
      'Proximo lanzamiento. Base iOS ya documentada con SwiftUI + SwiftData + Firebase Auth/FCM y arquitectura MVVM, en paralelo al frente Android con Compose y Retrofit.',
    tags: ['SwiftUI', 'SwiftData', 'Firebase Auth', 'Jetpack Compose', 'Retrofit'],
    category: 'web',
    badge: 'Proximamente',
    coverEyebrow: 'Ecosistema mobile',
    coverCaption: 'iOS y Android para artistas y clientes.',
    coverClass: 'project-cover--restaurant',
    links: [
      { label: 'Ver avance', href: 'https://github.com/app-piums/piums-platform', primary: true, icon: 'FaGithub' },
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
    cover: '/digital-cover.jpg',
    coverAlt: 'Sitio web Digital Care - soporte técnico e informática Guatemala',
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
      'Juego web clásico tipo Snake, desarrollado en React con Canvas, con controles táctiles para móvil y soporte para teclado WASD/flechas.',
    tags: ['React', 'JavaScript', 'Canvas'],
    category: 'juego',
    demoPath: '/snake',
    links: [
      { label: 'Código', href: 'https://github.com/DavexDev/DavexDev.github.io', primary: false, icon: 'FaCode' },
    ],
    cover: '/nake-cover.jpg',
    coverAlt: 'Juego Snake clásico',
  },
  {
    id: 108,
    title: 'CyberRisk Predictor GT 2026',
    category: 'datos',
    badge: 'Académico',
    demoPath: '/cyberrisk',
    coverEyebrow: 'Análisis predictivo',
    coverCaption: 'Regresión lineal aplicada a ciberseguridad.',
    cover: '/CyberRisk.png',
    coverAlt: 'CyberRisk Predictor GT 2026 - Dashboard interactivo de regresión lineal',
    description:
      'Dashboard interactivo que aplica regresión lineal simple para estimar el riesgo de intrusión en servidores a partir de intentos fallidos de acceso. Modelo original en R con R² = 0.9825. Carga tu propio dataset CSV y el modelo se recalcula en tiempo real.',
    outcome:
      'Los datos cargados persisten en localStorage entre visitas. Demuestra estadística inferencial aplicada a ciberseguridad.',
    tags: ['R', 'Shiny', 'React', 'Vite', 'Plotly.js', 'Regresión Lineal', 'Ciberseguridad'],
    links: [
      { label: 'Ver código', href: 'https://github.com/davexdev/cyberrisk-predictor', primary: false, icon: 'FaGithub' },
    ],
  },
  {
    id: 107,
    title: 'Parqueo El Roble',
    description:
      'Plataforma web para reservas y administración de parqueos en Esquipulas. Incluye panel de administración, gestión de usuarios, reservas, comisiones, métricas y notificaciones. UI moderna, onboarding guiado y despliegue en Vercel.',
    outcome:
      'Desarrollado 100% propio: diseño, frontend, backend y despliegue. Integración de roles, paneles, y experiencia mobile-first.',
    tags: ['Next.js 14', 'React', 'Tailwind CSS', 'Node.js', 'Vercel'],
    category: 'web',
    badge: 'Académico',
    coverEyebrow: 'Reserva tu espacio',
    coverCaption: 'Administra y reserva parqueos en Esquipulas.',
    coverClass: 'project-cover--energy',
    cover: '/Parqueo.png',
    coverAlt: 'Parqueo El Roble - plataforma de reservas',
    links: [
      { label: 'Ver sitio', href: 'https://parqueo-umber.vercel.app/', primary: true, icon: 'FaExternalLinkAlt' },
      { label: 'Repositorio', href: 'https://github.com/DavexDev/parqueo', primary: false, icon: 'FaGithub' },
    ],
  },
  {
    id: 115,
    title: 'claude-bell',
    description:
      'Paquete npm de notificaciones sonoras para Claude Code: reproduce un sonido cuando una tarea termina, cuando Claude espera tu aprobación para ejecutar una herramienta, cuando termina un subagente, o cuando falla un comando. Multiplataforma (Windows, macOS, Linux) y sin dependencias, mediante hooks de Claude Code.',
    outcome:
      'Publicado en npm como @davexdev/claude-bell, con 6 temas de sonido seleccionables e instalación en un solo comando.',
    tags: ['Node.js', 'CLI', 'Claude Code Hooks', 'npm', 'Cross-platform'],
    category: 'web',
    badge: 'Open Source',
    cover: '/claude-bell-cover.png',
    coverAlt: 'claude-bell - notificaciones de sonido para Claude Code',
    links: [
      { label: 'Ver en npm', href: 'https://www.npmjs.com/package/@davexdev/claude-bell', primary: true, icon: 'FaExternalLinkAlt' },
      { label: 'Repositorio', href: 'https://github.com/DavexDev/claude-bell', primary: false, icon: 'FaGithub' },
    ],
  },
  {
    id: 116,
    title: "Kaffe'm",
    description:
      'Sitio web para Kaffe\'m, cafetería boutique en Concepción Las Minas, Chiquimula. Landing con menú completo, ficha de producto y carrito con checkout directo por WhatsApp, ademas de historia del local y ubicación.',
    outcome:
      'Desplegado en Vercel con Next.js 16 (App Router) y TypeScript. Diseño editorial oscuro, catálogo completo de menú y flujo de pedido pensado para conversión sin backend propio.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'WhatsApp Checkout'],
    category: 'web',
    badge: 'Cliente',
    coverEyebrow: 'Café de especialidad',
    coverCaption: 'Menú, pedidos por WhatsApp y ubicación en un solo sitio.',
    cover: '/kaffem-cover.png',
    coverAlt: "Sitio web Kaffe'm - cafetería boutique en Concepción Las Minas, Chiquimula",
    links: [
      { label: 'Ver sitio', href: 'https://kaffe-m-z8ua.vercel.app/', primary: true, icon: 'FaExternalLinkAlt' },
    ],
  },
  {
    id: 117,
    title: 'AviTec — Tienda en línea',
    collaborators: 'SCADA',
    description:
      'Integración entre el punto de venta de AviTec y una vitrina en línea a la medida para AviTec, Tecnología Avícola (Chiquimula). El catálogo, precio y existencia se leen en vivo desde el mismo sistema de la tienda física, con cache que se refresca sola en segundo plano, fotos servidas desde un proxy propio que las optimiza, reglas de publicación curadas y pedido final por WhatsApp.',
    outcome:
      'Arquitectura pensada para más de un comercio con el mismo tipo de punto de venta sin tocar el código base, más páginas legales, enlaces de producto compartibles con vista previa para redes y WhatsApp, sitemap y una revisión de seguridad dedicada antes de publicar.',
    tags: ['Laravel 13', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'POS API'],
    category: 'web',
    badge: 'Cliente',
    cover: '/avitec-cover.jpg',
    coverAlt: 'Vitrina en línea de AviTec, Tecnología Avícola',
    links: [
      { label: 'Ver sitio', href: 'https://avitecgt.com/sitio', primary: true, icon: 'FaExternalLinkAlt' },
    ],
  }
];
