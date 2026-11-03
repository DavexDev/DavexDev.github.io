import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa'
import './intro-splash.css'

const SESSION_KEY = 'intro-seen'

function readSeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* sin storage: la intro vuelve a salir en la siguiente visita, no pasa nada */
  }
}

// Líneas que fluyen de esquina a esquina. Basado en el patrón "background paths",
// adaptado al tema del sitio: trazo con degradado cian -> violeta.
function FloatingPaths({ position, still }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
          312 - i * 5 * position
        } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        duration: 20 + Math.random() * 10,
      })),
    [position]
  )
  const gradId = `intro-grad-${position > 0 ? 'a' : 'b'}`

  return (
    <svg className="intro-paths" viewBox="0 0 696 316" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--primary)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--primary-2)' }} />
        </linearGradient>
      </defs>
      {paths.map((path) =>
        still ? (
          <path
            key={path.id}
            d={path.d}
            stroke={`url(#${gradId})`}
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
          />
        ) : (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={`url(#${gradId})`}
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }}
            transition={{ duration: path.duration, repeat: Infinity, ease: 'linear' }}
          />
        )
      )}
    </svg>
  )
}

const TITLE = 'Deyvi Xol'

export default function IntroSplash() {
  const [open, setOpen] = useState(() => !readSeen())
  const reduceMotion = useReducedMotion()

  const close = () => {
    markSeen()
    setOpen(false)
    // El gesto de scroll que cerró la intro no debe mover la página.
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Se entra al portafolio haciendo scroll: rueda/trackpad, deslizar hacia
    // arriba en touch o las teclas de scroll. Escape también cierra.
    const SCROLL_KEYS = ['ArrowDown', 'PageDown', ' ', 'End', 'Escape']
    const onKey = (e) => {
      if (SCROLL_KEYS.includes(e.key)) {
        e.preventDefault()
        close()
      }
    }
    const onWheel = (e) => {
      if (e.deltaY > 8) close()
    }
    let startY = null
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (startY !== null && startY - e.touches[0].clientY > 40) close()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [open])

  const words = TITLE.split(' ')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="intro"
          role="dialog"
          aria-modal="true"
          aria-label="Bienvenida"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="intro-bg" aria-hidden="true">
            <FloatingPaths position={1} still={reduceMotion} />
            <FloatingPaths position={-1} still={reduceMotion} />
          </div>

          <motion.div
            className="intro-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.img
              className="intro-mark"
              src="/logo-mark.png"
              alt=""
              width="120"
              height="120"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.7, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            />

            <span className="intro-eyebrow">
              ~/<b>davexdev</b> <span className="intro-caret" aria-hidden="true" />
            </span>

            <h1 className="intro-title" aria-label={TITLE}>
              {words.map((word, wi) => (
                <span key={wi} className="intro-word" aria-hidden="true">
                  {word.split('').map((letter, li) => (
                    <motion.span
                      key={`${wi}-${li}`}
                      className="intro-letter"
                      initial={reduceMotion ? false : { y: 90, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + wi * 0.12 + li * 0.04, type: 'spring', stiffness: 150, damping: 22 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              className="intro-sub"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Full Stack <span>&amp;</span> Mobile Developer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6 }}
            >
              <button type="button" className="btn primary intro-cta" onClick={close}>
                Ver portafolio
                <FaArrowRight aria-hidden="true" size={13} className="intro-cta-arrow" />
              </button>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className="intro-scroll"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            aria-label="Hacer scroll para entrar al portafolio"
          >
            <span className="intro-mouse" aria-hidden="true">
              <span className="intro-mouse-wheel" />
            </span>
            <span className="intro-scroll-text">Haz scroll para entrar</span>
            <FaChevronDown aria-hidden="true" size={12} className="intro-scroll-chevron" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
