import { useState, useRef, useEffect, useCallback } from 'react'

const PADS = [
  { color: '#00d9ff', flash: '#7be9ff' },
  { color: '#ff4d6d', flash: '#ff9fb0' },
  { color: '#ffd166', flash: '#ffe8ab' },
  { color: '#00ffa3', flash: '#7dffce' },
]

const STEP_DELAY = 550
const FLASH_DURATION = 350

export default function SimonGame() {
  const [sequence, setSequence] = useState([])
  const [userIndex, setUserIndex] = useState(0)
  const [level, setLevel] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('simon-best') || 0))
  const [activePad, setActivePad] = useState(null)
  const [showingSequence, setShowingSequence] = useState(false)
  const [status, setStatus] = useState('idle')
  const timeoutsRef = useRef([])

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id))
    timeoutsRef.current = []
  }

  useEffect(() => clearTimers, [])

  const playSequence = useCallback((seq) => {
    setShowingSequence(true)
    setUserIndex(0)
    seq.forEach((step, i) => {
      const onId = setTimeout(() => setActivePad(step), i * STEP_DELAY)
      const offId = setTimeout(() => setActivePad(null), i * STEP_DELAY + FLASH_DURATION)
      timeoutsRef.current.push(onId, offId)
    })
    const doneId = setTimeout(() => setShowingSequence(false), seq.length * STEP_DELAY)
    timeoutsRef.current.push(doneId)
  }, [])

  const startGame = () => {
    clearTimers()
    const first = [Math.floor(Math.random() * 4)]
    setSequence(first)
    setLevel(1)
    setStatus('playing')
    playSequence(first)
  }

  const handlePadClick = (index) => {
    if (showingSequence || status !== 'playing') return
    if (index === sequence[userIndex]) {
      setActivePad(index)
      setTimeout(() => setActivePad(null), 180)
      const nextIndex = userIndex + 1
      if (nextIndex === sequence.length) {
        const newLevel = level + 1
        setLevel(newLevel)
        setBest((b) => {
          const nb = Math.max(b, level)
          localStorage.setItem('simon-best', String(nb))
          return nb
        })
        const nextSeq = [...sequence, Math.floor(Math.random() * 4)]
        setSequence(nextSeq)
        const id = setTimeout(() => playSequence(nextSeq), 700)
        timeoutsRef.current.push(id)
      } else {
        setUserIndex(nextIndex)
      }
    } else {
      clearTimers()
      setStatus('over')
      setBest((b) => {
        const nb = Math.max(b, level - 1)
        localStorage.setItem('simon-best', String(nb))
        return nb
      })
    }
  }

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>Simon</h1>
      <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 1.25rem' }}>
        Repite la secuencia de colores. Cada ronda suma uno más.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: 700 }}>
        <span style={{ color: '#00ffa3' }}>Nivel: {status === 'idle' ? '-' : level}</span>
        <span style={{ color: '#a7b4d6' }}>Mejor: {best}</span>
      </div>

      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          width: 260,
          height: 260,
          margin: '0 auto',
        }}
      >
        {PADS.map((pad, i) => (
          <button
            key={i}
            onClick={() => handlePadClick(i)}
            disabled={status !== 'playing' || showingSequence}
            aria-label={`Color ${i + 1}`}
            style={{
              borderRadius: 16,
              border: 'none',
              cursor: status === 'playing' && !showingSequence ? 'pointer' : 'default',
              background: activePad === i ? pad.flash : pad.color,
              opacity: activePad === i ? 1 : 0.75,
              boxShadow: activePad === i ? `0 0 24px ${pad.color}` : 'none',
              transition: 'background 0.1s ease, opacity 0.1s ease, box-shadow 0.1s ease',
            }}
          />
        ))}

        {status !== 'playing' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,10,15,0.85)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            {status === 'over' && (
              <p style={{ color: '#ff4d6d', fontWeight: 800, fontSize: '1rem', margin: 0 }}>
                Fallaste en el nivel {level}
              </p>
            )}
            <button onClick={startGame} style={btnStyle('#00d9ff')}>
              {status === 'over' ? 'Intentar de nuevo' : 'Comenzar'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function btnStyle(color) {
  return {
    background: 'rgba(255,255,255,0.06)',
    color,
    border: `1px solid ${color}55`,
    borderRadius: 9999,
    padding: '0.55rem 1.2rem',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
  }
}
