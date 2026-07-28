import { useState, useMemo, useCallback, useEffect } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function boxIndex(r, c) { return Math.floor(r / 3) * 3 + Math.floor(c / 3) }

function solve(grid, { randomize = false, limit = 1 } = {}) {
  const rows = new Array(9).fill(0)
  const cols = new Array(9).fill(0)
  const boxes = new Array(9).fill(0)
  const empties = []
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = grid[r][c]
      if (v === 0) {
        empties.push([r, c])
      } else {
        const bit = 1 << v
        rows[r] |= bit; cols[c] |= bit; boxes[boxIndex(r, c)] |= bit
      }
    }
  }
  let solutionCount = 0
  let solutionGrid = null

  function backtrack(idx) {
    if (idx === empties.length) {
      solutionCount++
      if (!solutionGrid) solutionGrid = grid.map((row) => [...row])
      return solutionCount >= limit
    }
    const [r, c] = empties[idx]
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (randomize) nums = shuffle(nums)
    const b = boxIndex(r, c)
    for (const n of nums) {
      const bit = 1 << n
      if (rows[r] & bit || cols[c] & bit || boxes[b] & bit) continue
      grid[r][c] = n
      rows[r] |= bit; cols[c] |= bit; boxes[b] |= bit
      const stop = backtrack(idx + 1)
      grid[r][c] = 0
      rows[r] &= ~bit; cols[c] &= ~bit; boxes[b] &= ~bit
      if (stop) return true
    }
    return false
  }
  backtrack(0)
  return { count: solutionCount, solution: solutionGrid }
}

function generateSolved() {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0))
  return solve(grid, { randomize: true, limit: 1 }).solution
}

function carve(solvedGrid, targetGivens) {
  const puzzle = solvedGrid.map((row) => [...row])
  const positions = []
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) positions.push([r, c])
  const order = shuffle(positions)
  let givens = 81
  for (const [r, c] of order) {
    if (givens <= targetGivens) break
    const backup = puzzle[r][c]
    puzzle[r][c] = 0
    const { count } = solve(puzzle.map((row) => [...row]), { limit: 2 })
    if (count !== 1) {
      puzzle[r][c] = backup
    } else {
      givens--
    }
  }
  return puzzle
}

function findConflicts(grid) {
  const conflicts = new Set()
  const mark = (cells) => {
    const seen = {}
    for (const [r, c] of cells) {
      const v = grid[r][c]
      if (!v) continue
      if (seen[v] !== undefined) {
        conflicts.add(seen[v].join(','))
        conflicts.add(`${r},${c}`)
      } else {
        seen[v] = [r, c]
      }
    }
  }
  for (let r = 0; r < 9; r++) mark(Array.from({ length: 9 }, (_, c) => [r, c]))
  for (let c = 0; c < 9; c++) mark(Array.from({ length: 9 }, (_, r) => [r, c]))
  for (let br = 0; br < 3; br++) for (let bc = 0; bc < 3; bc++) {
    mark(Array.from({ length: 9 }, (_, i) => [br * 3 + Math.floor(i / 3), bc * 3 + (i % 3)]))
  }
  return conflicts
}

const DIFFICULTIES = { 'Fácil': 44, 'Medio': 34, 'Difícil': 28 }

function newPuzzle(target) {
  const solved = generateSolved()
  const puzzle = carve(solved, target)
  const given = puzzle.map((row) => row.map((v) => v !== 0))
  return { solved, puzzle, given, user: puzzle.map((row) => [...row]) }
}

export default function SudokuGame() {
  const [difficulty, setDifficulty] = useState('Medio')
  const [state, setState] = useState(() => newPuzzle(DIFFICULTIES['Medio']))
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const conflicts = useMemo(() => findConflicts(state.user), [state.user])
  const won = !revealed && state.user.every((row) => row.every((v) => v !== 0)) && conflicts.size === 0

  const newGame = (diff = difficulty) => {
    setState(newPuzzle(DIFFICULTIES[diff]))
    setSelected(null)
    setRevealed(false)
  }

  const setNumber = useCallback((n) => {
    if (!selected || revealed) return
    const [r, c] = selected
    if (state.given[r][c]) return
    setState((prev) => {
      const user = prev.user.map((row) => [...row])
      user[r][c] = n
      return { ...prev, user }
    })
  }, [selected, revealed, state.given])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '9') setNumber(Number(e.key))
      else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') setNumber(0)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setNumber])

  const reveal = () => {
    setState((prev) => ({ ...prev, user: prev.solved.map((row) => [...row]) }))
    setRevealed(true)
  }

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>Sudoku</h1>
      <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 1.25rem' }}>
        Selecciona una celda y usa el teclado numérico o los números 1-9.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        {Object.keys(DIFFICULTIES).map((d) => (
          <button
            key={d}
            onClick={() => { setDifficulty(d); newGame(d) }}
            style={{ ...btnStyle('#00d9ff'), opacity: difficulty === d ? 1 : 0.45 }}
          >
            {d}
          </button>
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: 0,
          background: '#11151c',
          border: '2px solid rgba(255,255,255,0.25)',
          borderRadius: 8,
        }}
      >
        {state.user.flat().map((value, i) => {
          const r = Math.floor(i / 9)
          const c = i % 9
          const isGiven = state.given[r][c]
          const isSelected = selected && selected[0] === r && selected[1] === c
          const isConflict = conflicts.has(`${r},${c}`)
          return (
            <button
              key={i}
              onClick={() => setSelected([r, c])}
              disabled={revealed}
              style={{
                width: '2.15rem',
                height: '2.15rem',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: r % 3 === 0 ? '2px solid rgba(255,255,255,0.25)' : undefined,
                borderLeft: c % 3 === 0 ? '2px solid rgba(255,255,255,0.25)' : undefined,
                borderRight: c === 8 ? '2px solid rgba(255,255,255,0.25)' : undefined,
                borderBottom: r === 8 ? '2px solid rgba(255,255,255,0.25)' : undefined,
                background: isSelected ? 'rgba(0,217,255,0.18)' : 'transparent',
                color: isConflict ? '#ff4d6d' : isGiven ? '#e6f0ff' : '#00d9ff',
                fontWeight: isGiven ? 700 : 600,
                fontSize: '0.95rem',
                cursor: revealed ? 'default' : 'pointer',
              }}
            >
              {value || ''}
            </button>
          )
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 2.4rem)',
          gap: '0.4rem',
          justifyContent: 'center',
          margin: '1.25rem auto 0',
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button key={n} onClick={() => setNumber(n)} style={numStyle}>{n}</button>
        ))}
        <button onClick={() => setNumber(0)} style={numStyle}>✕</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.25rem' }}>
        <button onClick={() => newGame()} style={btnStyle('#a7b4d6')}>Nueva partida</button>
        <button onClick={reveal} style={btnStyle('#ffd166')}>Resolver</button>
      </div>

      {won && (
        <p style={{ color: '#00ffa3', fontWeight: 800, marginTop: '1rem' }}>¡Resuelto correctamente!</p>
      )}
      {revealed && (
        <p style={{ color: '#a7b4d6', fontSize: '0.8rem', marginTop: '1rem' }}>Solución revelada.</p>
      )}
    </div>
  )
}

const numStyle = {
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#e6f0ff',
  fontWeight: 700,
  fontSize: '0.95rem',
  cursor: 'pointer',
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
