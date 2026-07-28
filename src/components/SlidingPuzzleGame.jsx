import { useState } from 'react'

const SIZE = 4

function solvedTiles() {
  const t = Array.from({ length: 15 }, (_, i) => i + 1)
  t.push(0)
  return t
}

function neighbors(i) {
  const r = Math.floor(i / SIZE), c = i % SIZE
  const out = []
  if (r > 0) out.push(i - SIZE)
  if (r < SIZE - 1) out.push(i + SIZE)
  if (c > 0) out.push(i - 1)
  if (c < SIZE - 1) out.push(i + 1)
  return out
}

function shuffleTiles(moves = 200) {
  let tiles = solvedTiles()
  let blank = tiles.indexOf(0)
  let lastBlank = -1
  for (let i = 0; i < moves; i++) {
    const opts = neighbors(blank).filter((n) => n !== lastBlank)
    const next = opts[Math.floor(Math.random() * opts.length)]
    ;[tiles[blank], tiles[next]] = [tiles[next], tiles[blank]]
    lastBlank = blank
    blank = next
  }
  return tiles
}

function isSolved(tiles) {
  for (let i = 0; i < 15; i++) if (tiles[i] !== i + 1) return false
  return tiles[15] === 0
}

export default function SlidingPuzzleGame() {
  const [tiles, setTiles] = useState(() => shuffleTiles())
  const [moves, setMoves] = useState(0)

  const won = isSolved(tiles)

  const handleTileClick = (i) => {
    if (won) return
    const blank = tiles.indexOf(0)
    if (!neighbors(blank).includes(i)) return
    setTiles((prev) => {
      const next = [...prev]
      ;[next[blank], next[i]] = [next[i], next[blank]]
      return next
    })
    setMoves((m) => m + 1)
  }

  const restart = () => {
    setTiles(shuffleTiles())
    setMoves(0)
  }

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>Rompecabezas 15</h1>
      <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 1.25rem' }}>
        Toca una ficha junto al espacio vacío para moverla.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700 }}>
        <span style={{ color: '#00ffa3' }}>Movimientos: {moves}</span>
      </div>

      <div
        style={{
          position: 'relative',
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          gap: 6,
          background: '#11151c',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: 6,
        }}
      >
        {tiles.map((value, i) => (
          <button
            key={i}
            onClick={() => handleTileClick(i)}
            disabled={value === 0}
            style={{
              width: '4.2rem',
              height: '4.2rem',
              borderRadius: 8,
              border: 'none',
              background: value === 0 ? 'transparent' : 'rgba(0,217,255,0.14)',
              color: '#e6f0ff',
              fontWeight: 800,
              fontSize: '1.2rem',
              cursor: value === 0 ? 'default' : 'pointer',
            }}
          >
            {value || ''}
          </button>
        ))}

        {won && (
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
            <p style={{ color: '#00ffa3', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>
              ¡Resuelto en {moves} movimientos!
            </p>
            <button onClick={restart} style={btnStyle('#00ffa3')}>Jugar de nuevo</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <button onClick={restart} style={btnStyle('#a7b4d6')}>Reiniciar</button>
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
    padding: '0.5rem 1.1rem',
    fontSize: '0.78rem',
    fontWeight: 700,
    cursor: 'pointer',
  }
}
