import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

const DISK_COLORS = [
  '#00d9ff', '#7c4dff', '#00ffa3', '#ff9f43',
  '#ff4d6d', '#ffd166', '#4dd0e1',
]

function buildInitialTowers(n) {
  const first = []
  for (let size = n; size >= 1; size--) first.push(size)
  return [first, [], []]
}

function generateSolution(n, from, to, aux, out) {
  if (n === 0) return out
  generateSolution(n - 1, from, aux, to, out)
  out.push([from, to])
  generateSolution(n - 1, aux, to, from, out)
  return out
}

const STYLES = `
.hanoi-peg {
  cursor: pointer;
  outline: none;
  transition: transform 0.15s ease;
}
.hanoi-peg:hover .hanoi-base { border-color: rgba(0,217,255,0.5); }
.hanoi-peg.is-selected .hanoi-base { border-color: #00d9ff; box-shadow: 0 0 22px rgba(0,217,255,0.35); }
.hanoi-disk {
  transition: width 0.2s ease, background 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hanoi-disk.is-lifted { transform: translateY(-14px); }
@keyframes hanoi-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
@media (max-width: 560px) {
  .hanoi-towers { gap: 0.75rem !important; }
}
`

export default function HanoiGame() {
  const [numDisks, setNumDisks] = useState(5)
  const [towers, setTowers] = useState(() => buildInitialTowers(5))
  const [selected, setSelected] = useState(null)
  const [moves, setMoves] = useState(0)
  const [solving, setSolving] = useState(false)
  const [invalidPeg, setInvalidPeg] = useState(null)

  const solveTimerRef = useRef(null)

  const won = towers[2].length === numDisks && moves > 0

  const minMoves = useMemo(() => 2 ** numDisks - 1, [numDisks])

  const stopSolving = useCallback(() => {
    if (solveTimerRef.current) {
      clearInterval(solveTimerRef.current)
      solveTimerRef.current = null
    }
    setSolving(false)
  }, [])

  const reset = useCallback((n = numDisks) => {
    stopSolving()
    setTowers(buildInitialTowers(n))
    setSelected(null)
    setMoves(0)
    setInvalidPeg(null)
  }, [numDisks, stopSolving])

  useEffect(() => {
    return () => stopSolving()
  }, [stopSolving])

  const flashInvalid = (pegIndex) => {
    setInvalidPeg(pegIndex)
    setTimeout(() => setInvalidPeg((p) => (p === pegIndex ? null : p)), 260)
  }

  const attemptMove = useCallback((from, to) => {
    let moved = false
    setTowers((prev) => {
      if (from === to) return prev
      const src = prev[from]
      const dst = prev[to]
      if (src.length === 0) return prev
      const disk = src[src.length - 1]
      if (dst.length > 0 && dst[dst.length - 1] < disk) {
        flashInvalid(to)
        return prev
      }
      moved = true
      const next = prev.map((p) => [...p])
      next[from].pop()
      next[to].push(disk)
      return next
    })
    return moved
  }, [])

  const handlePegClick = (pegIndex) => {
    if (solving || won) return
    if (selected === null) {
      if (towers[pegIndex].length === 0) return
      setSelected(pegIndex)
    } else if (selected === pegIndex) {
      setSelected(null)
    } else {
      const moved = attemptMove(selected, pegIndex)
      if (moved) setMoves((m) => m + 1)
      setSelected(null)
    }
  }

  const handleAutoSolve = () => {
    if (solving || won) return
    reset(numDisks)
    setSolving(true)
    const sequence = generateSolution(numDisks, 0, 2, 1, [])
    let i = 0
    solveTimerRef.current = setInterval(() => {
      if (i >= sequence.length) {
        stopSolving()
        return
      }
      const [from, to] = sequence[i]
      attemptMove(from, to)
      setMoves((m) => m + 1)
      i += 1
    }, 420)
  }

  const handleDiskCountChange = (e) => {
    const n = Number(e.target.value)
    setNumDisks(n)
    reset(n)
  }

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 760, margin: '0 auto' }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>
          Torre de Hanoi
        </h1>
        <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 0' }}>
          Toca una torre para seleccionar el disco superior, toca otra para moverlo.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a7b4d6', fontSize: '0.8rem' }}>
          Discos:
          <select
            value={numDisks}
            onChange={handleDiskCountChange}
            disabled={solving}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#e6f0ff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '0.35rem 0.6rem',
              fontSize: '0.8rem',
            }}
          >
            {[3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div style={{ color: '#e6f0ff', fontSize: '0.8rem', fontWeight: 600 }}>
          Movimientos: <span style={{ color: '#00d9ff' }}>{moves}</span>
          <span style={{ color: '#556' }}> / mínimo {minMoves}</span>
        </div>

        <button
          onClick={handleAutoSolve}
          disabled={solving}
          style={btnStyle('#00d9ff')}
        >
          {solving ? 'Resolviendo…' : 'Resolver automáticamente'}
        </button>

        <button onClick={() => reset(numDisks)} style={btnStyle('#a7b4d6')}>
          Reiniciar
        </button>
      </div>

      <div
        className="hanoi-towers"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '2rem',
          height: 260,
          position: 'relative',
        }}
      >
        {towers.map((peg, pegIndex) => (
          <Peg
            key={pegIndex}
            disks={peg}
            numDisks={numDisks}
            isSelected={selected === pegIndex}
            isInvalid={invalidPeg === pegIndex}
            onClick={() => handlePegClick(pegIndex)}
          />
        ))}
      </div>

      {won && (
        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <p style={{ color: '#00ffa3', fontWeight: 700, fontSize: '1rem' }}>
            ¡Resuelto en {moves} movimientos!
          </p>
          <button onClick={() => reset(numDisks)} style={btnStyle('#00ffa3')}>
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  )
}

function Peg({ disks, numDisks, isSelected, isInvalid, onClick }) {
  const maxWidth = 190
  const minWidth = 46

  return (
    <div
      className={`hanoi-peg${isSelected ? ' is-selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Torre"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      style={{
        position: 'relative',
        width: maxWidth + 20,
        height: 220,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        transform: isInvalid ? 'translateX(0)' : undefined,
        animation: isInvalid ? 'hanoi-shake 0.26s ease' : 'none',
      }}
    >
      <div
        className="hanoi-base"
        style={{
          position: 'absolute',
          bottom: 0,
          width: maxWidth + 20,
          height: 10,
          borderRadius: 6,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 6,
          width: 8,
          height: 190,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.12)',
        }}
      />
      {disks.map((size, i) => {
        const width = minWidth + ((size - 1) / Math.max(numDisks - 1, 1)) * (maxWidth - minWidth)
        const isTop = i === disks.length - 1
        return (
          <div
            key={size}
            className={`hanoi-disk${isSelected && isTop ? ' is-lifted' : ''}`}
            style={{
              width,
              height: 20,
              borderRadius: 6,
              marginBottom: 3,
              background: DISK_COLORS[(size - 1) % DISK_COLORS.length],
              boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
            }}
          />
        )
      })}
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
