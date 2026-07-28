import { useEffect, useRef, useState, useCallback } from 'react'
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaPause, FaPlay } from 'react-icons/fa'

const GRID = 18
const CELL = 20
const CANVAS_SIZE = GRID * CELL

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

function randomFood(snake) {
  let cell
  do {
    cell = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
  } while (snake.some((s) => s.x === cell.x && s.y === cell.y))
  return cell
}

function initialSnake() {
  const y = Math.floor(GRID / 2)
  return [
    { x: 8, y },
    { x: 7, y },
    { x: 6, y },
  ]
}

export default function SnakeGame() {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const rafRef = useRef(null)
  const lastTickRef = useRef(0)
  const speedRef = useRef(140)

  const snakeRef = useRef(initialSnake())
  const dirRef = useRef(DIRS.right)
  const queuedDirRef = useRef(null)
  const foodRef = useRef(randomFood(snakeRef.current))
  const runningRef = useRef(true)

  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('snake-best') || 0))
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(false)

  const draw = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    ctx.fillStyle = '#111827'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL, 0)
      ctx.lineTo(i * CELL, CANVAS_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL)
      ctx.lineTo(CANVAS_SIZE, i * CELL)
      ctx.stroke()
    }

    const food = foodRef.current
    ctx.fillStyle = '#ff4d6d'
    ctx.beginPath()
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2.6, 0, Math.PI * 2)
    ctx.fill()

    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#00ffa3' : '#00d9ff'
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
    })
  }, [])

  const endGame = useCallback(() => {
    runningRef.current = false
    setGameOver(true)
    setBest((prev) => {
      const next = Math.max(prev, snakeRef.current.length - 3)
      localStorage.setItem('snake-best', String(next))
      return next
    })
  }, [])

  const tick = useCallback(() => {
    if (queuedDirRef.current) {
      const nd = queuedDirRef.current
      const cur = dirRef.current
      const isReverse = nd.x === -cur.x && nd.y === -cur.y
      if (!isReverse) dirRef.current = nd
      queuedDirRef.current = null
    }

    const dir = dirRef.current
    const snake = snakeRef.current
    const head = snake[0]
    const newHead = { x: head.x + dir.x, y: head.y + dir.y }

    if (newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID) {
      endGame()
      return
    }
    if (snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      endGame()
      return
    }

    const nextSnake = [newHead, ...snake]
    const food = foodRef.current
    if (newHead.x === food.x && newHead.y === food.y) {
      foodRef.current = randomFood(nextSnake)
      setScore((s) => s + 1)
    } else {
      nextSnake.pop()
    }
    snakeRef.current = nextSnake
    draw()
  }, [draw, endGame])

  const loop = useCallback((timestamp) => {
    rafRef.current = requestAnimationFrame(loop)
    if (!runningRef.current) return
    if (timestamp - lastTickRef.current >= speedRef.current) {
      lastTickRef.current = timestamp
      tick()
    }
  }, [tick])

  useEffect(() => {
    const canvas = canvasRef.current
    ctxRef.current = canvas.getContext('2d')
    draw()
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    speedRef.current = Math.max(70, 140 - Math.floor(score / 5) * 8)
  }, [score])

  const queueDirection = useCallback((key) => {
    if (gameOver) return
    queuedDirRef.current = key
    if (paused) setPaused(false)
    runningRef.current = true
  }, [gameOver, paused])

  useEffect(() => {
    const onKeyDown = (e) => {
      const map = {
        ArrowUp: DIRS.up, w: DIRS.up, W: DIRS.up,
        ArrowDown: DIRS.down, s: DIRS.down, S: DIRS.down,
        ArrowLeft: DIRS.left, a: DIRS.left, A: DIRS.left,
        ArrowRight: DIRS.right, d: DIRS.right, D: DIRS.right,
      }
      const dir = map[e.key]
      if (!dir) return
      if (e.key.startsWith('Arrow')) e.preventDefault()
      queueDirection(dir)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [queueDirection])

  const restart = () => {
    snakeRef.current = initialSnake()
    dirRef.current = DIRS.right
    queuedDirRef.current = null
    foodRef.current = randomFood(snakeRef.current)
    runningRef.current = true
    lastTickRef.current = 0
    speedRef.current = 140
    setScore(0)
    setGameOver(false)
    setPaused(false)
    draw()
  }

  const togglePause = () => {
    if (gameOver) return
    setPaused((p) => {
      runningRef.current = p
      return !p
    })
  }

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>Snake</h1>
      <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 1.25rem' }}>
        Flechas o WASD en escritorio · botones táctiles en móvil.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700 }}>
        <span style={{ color: '#00ffa3' }}>Puntaje: {score}</span>
        <span style={{ color: '#a7b4d6' }}>Mejor: {best}</span>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{
            width: '100%',
            maxWidth: CANVAS_SIZE,
            height: 'auto',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            touchAction: 'none',
          }}
        />

        {(gameOver || paused) && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,10,15,0.82)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <p style={{ color: gameOver ? '#ff4d6d' : '#e6f0ff', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>
              {gameOver ? 'Game Over' : 'Pausado'}
            </p>
            {gameOver && (
              <button onClick={restart} style={btnStyle('#00ffa3')}>Jugar de nuevo</button>
            )}
            {paused && !gameOver && (
              <button onClick={togglePause} style={btnStyle('#00d9ff')}>Reanudar</button>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.25rem' }}>
        <button onClick={togglePause} disabled={gameOver} style={btnStyle('#a7b4d6')} aria-label={paused ? 'Reanudar' : 'Pausar'}>
          {paused ? <FaPlay size={12} /> : <FaPause size={12} />}
        </button>
        <button onClick={restart} style={btnStyle('#a7b4d6')}>Reiniciar</button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 3.2rem)',
          gridTemplateRows: 'repeat(3, 3.2rem)',
          gap: '0.4rem',
          justifyContent: 'center',
          margin: '1.5rem auto 0',
        }}
      >
        <span />
        <DPadButton onPress={() => queueDirection(DIRS.up)} label="Arriba"><FaArrowUp /></DPadButton>
        <span />
        <DPadButton onPress={() => queueDirection(DIRS.left)} label="Izquierda"><FaArrowLeft /></DPadButton>
        <span />
        <DPadButton onPress={() => queueDirection(DIRS.right)} label="Derecha"><FaArrowRight /></DPadButton>
        <span />
        <DPadButton onPress={() => queueDirection(DIRS.down)} label="Abajo"><FaArrowDown /></DPadButton>
        <span />
      </div>
    </div>
  )
}

function DPadButton({ onPress, label, children }) {
  return (
    <button
      onClick={onPress}
      aria-label={label}
      style={{
        width: '3.2rem',
        height: '3.2rem',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#e6f0ff',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

function btnStyle(color) {
  return {
    background: 'rgba(255,255,255,0.06)',
    color,
    border: `1px solid ${color}55`,
    borderRadius: 9999,
    padding: '0.5rem 1.1rem',
    fontSize: '0.78rem',
    fontWeight: 700,
    cursor: 'pointer',
  }
}
