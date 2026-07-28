import { useState, useEffect, useRef, useCallback } from 'react'

const TILE_COLORS = {
  2: '#3a3f4b', 4: '#454b5c', 8: '#00d9ff', 16: '#00c2e0',
  32: '#ff9f43', 64: '#ff8021', 128: '#ffd166', 256: '#ffc93c',
  512: '#00ffa3', 1024: '#00e08e', 2048: '#ff4d6d', 4096: '#c724ff',
}

function emptyGrid() {
  return Array.from({ length: 4 }, () => [0, 0, 0, 0])
}

function slideLine(line) {
  const nums = line.filter((v) => v !== 0)
  let gained = 0
  const merged = []
  let i = 0
  while (i < nums.length) {
    if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      const val = nums[i] * 2
      merged.push(val)
      gained += val
      i += 2
    } else {
      merged.push(nums[i])
      i += 1
    }
  }
  while (merged.length < line.length) merged.push(0)
  return { line: merged, gained }
}

function transpose(grid) {
  return grid[0].map((_, c) => grid.map((row) => row[c]))
}
function reverseRows(grid) {
  return grid.map((row) => [...row].reverse())
}

function moveGrid(grid, direction) {
  let g = grid.map((r) => [...r])
  let gained = 0
  if (direction === 'up' || direction === 'down') g = transpose(g)
  if (direction === 'right' || direction === 'down') g = reverseRows(g)
  const newG = g.map((row) => {
    const r = slideLine(row)
    gained += r.gained
    return r.line
  })
  let result = newG
  if (direction === 'right' || direction === 'down') result = reverseRows(result)
  if (direction === 'up' || direction === 'down') result = transpose(result)
  const moved = JSON.stringify(result) !== JSON.stringify(grid)
  return { grid: result, gained, moved }
}

function hasMoves(grid) {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return true
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return true
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return true
    }
  }
  return false
}

function spawnTile(grid) {
  const empties = []
  grid.forEach((row, r) => row.forEach((v, c) => { if (v === 0) empties.push([r, c]) }))
  if (empties.length === 0) return grid
  const [r, c] = empties[Math.floor(Math.random() * empties.length)]
  const next = grid.map((row) => [...row])
  next[r][c] = Math.random() < 0.9 ? 2 : 4
  return next
}

function initGrid() {
  return spawnTile(spawnTile(emptyGrid()))
}

export default function Game2048() {
  const [grid, setGrid] = useState(initGrid)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('2048-best') || 0))
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [keepPlaying, setKeepPlaying] = useState(false)
  const touchStart = useRef(null)

  const move = useCallback((direction) => {
    if (gameOver || (won && !keepPlaying)) return
    setGrid((prev) => {
      const result = moveGrid(prev, direction)
      if (!result.moved) return prev
      const next = spawnTile(result.grid)
      setScore((s) => {
        const ns = s + result.gained
        setBest((b) => {
          const nb = Math.max(b, ns)
          localStorage.setItem('2048-best', String(nb))
          return nb
        })
        return ns
      })
      if (!won && next.some((row) => row.some((v) => v >= 2048))) setWon(true)
      if (!hasMoves(next)) setGameOver(true)
      return next
    })
  }, [gameOver, won, keepPlaying])

  useEffect(() => {
    const onKeyDown = (e) => {
      const map = {
        ArrowUp: 'up', w: 'up', W: 'up',
        ArrowDown: 'down', s: 'down', S: 'down',
        ArrowLeft: 'left', a: 'left', A: 'left',
        ArrowRight: 'right', d: 'right', D: 'right',
      }
      const dir = map[e.key]
      if (!dir) return
      if (e.key.startsWith('Arrow')) e.preventDefault()
      move(dir)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  const restart = () => {
    setGrid(initGrid())
    setScore(0)
    setGameOver(false)
    setWon(false)
    setKeepPlaying(false)
  }

  const onTouchStart = (e) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    touchStart.current = null
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left')
    else move(dy > 0 ? 'down' : 'up')
  }

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>2048</h1>
      <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 1.25rem' }}>
        Flechas/WASD, desliza en la cuadrícula o usa los botones.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700 }}>
        <span style={{ color: '#00ffa3' }}>Puntaje: {score}</span>
        <span style={{ color: '#a7b4d6' }}>Mejor: {best}</span>
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          background: '#11151c',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: 8,
          touchAction: 'none',
        }}
      >
        {grid.flat().map((value, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1 / 1',
              borderRadius: 8,
              background: value ? TILE_COLORS[value] || '#c724ff' : 'rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: value >= 1024 ? '1rem' : '1.3rem',
              color: value <= 4 ? '#a7b4d6' : '#0f0f0f',
              transition: 'background 0.15s ease',
            }}
          >
            {value || ''}
          </div>
        ))}

        {(gameOver || (won && !keepPlaying)) && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,10,15,0.88)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <p style={{ color: gameOver ? '#ff4d6d' : '#00ffa3', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>
              {gameOver ? 'Sin movimientos' : '¡Llegaste a 2048!'}
            </p>
            {won && !gameOver && (
              <button onClick={() => setKeepPlaying(true)} style={btnStyle('#00d9ff')}>Seguir jugando</button>
            )}
            <button onClick={restart} style={btnStyle('#00ffa3')}>Nuevo juego</button>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 3rem)',
          gridTemplateRows: 'repeat(3, 3rem)',
          gap: '0.4rem',
          justifyContent: 'center',
          margin: '1.5rem auto 0',
        }}
      >
        <span />
        <ArrowButton onPress={() => move('up')} label="Arriba">▲</ArrowButton>
        <span />
        <ArrowButton onPress={() => move('left')} label="Izquierda">◀</ArrowButton>
        <button onClick={restart} style={{ ...btnStyle('#a7b4d6'), width: '3rem', height: '3rem', padding: 0, borderRadius: 12 }}>↺</button>
        <ArrowButton onPress={() => move('right')} label="Derecha">▶</ArrowButton>
        <span />
        <ArrowButton onPress={() => move('down')} label="Abajo">▼</ArrowButton>
        <span />
      </div>
    </div>
  )
}

function ArrowButton({ onPress, label, children }) {
  return (
    <button
      onClick={onPress}
      aria-label={label}
      style={{
        width: '3rem',
        height: '3rem',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#e6f0ff',
        fontSize: '1rem',
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
