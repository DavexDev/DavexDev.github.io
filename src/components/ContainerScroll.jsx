import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 0.35], [18, 0])
  const scale  = useTransform(scrollYProgress, [0, 0.35], isMobile ? [0.82, 1] : [1.06, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.35], [40, 0])

  return (
    <div ref={containerRef} className="cs-wrap">
      <div className="cs-inner">
        {titleComponent && (
          <motion.div style={{ translateY }} className="cs-header">
            {titleComponent}
          </motion.div>
        )}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            transformOrigin: 'top center',
            boxShadow:
              '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026',
          }}
          className="cs-card"
        >
          <div className="cs-card-inner">{children}</div>
        </motion.div>
      </div>
    </div>
  )
}
