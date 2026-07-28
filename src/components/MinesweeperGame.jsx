import { useState, useRef, useEffect, useCallback } from 'react'
import { FaFlag, FaBomb } from 'react-icons/fa'

const ROWS = 9
const COLS = 9
const MINES = 10

function emptyBoard() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, adjacent: 0, revealed: false, flagged: false }))
  )
}

function placeMines(board, safeR, safeC) {
  const forbidden = new Set()
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    const nr = safeR + dr, nc = safeC + dc
    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) forbidden.add(`${nr},${nc}`)
  }
  let placed = 0
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS)
    const c = Math.floor(Math.random() * COLS)
    const key = `${r},${c}`
    if (forbidden.has(key) || board[r][c].mine) continue
    board[r][c].mine = true
    placed++
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue
        const nr = r + dr, nc = c + dc
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) count++
      }
      board[r][c].adjacent = count
    }
  }
  return board
}

function floodReveal(board, r, c) {
  const stack = [[r, c]]
  while (stack.length) {
    const [cr, cc] = stack.pop()
    const cell = board[cr][cc]
    if (cell.revealed || cell.flagged) continue
    cell.revealed = true
    if (cell.adjacent === 0 && !cell.mine) {
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue
        const nr = cr + dr, nc = cc + dc
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !board[nr][nc].revealed) stack.push([nr, nc])
      }
    }
  }
}

const NUMBER_COLORS = ['#a7b4d6', '#00d9ff', '#00ffa3', '#ffd166', '#ff9f43', '#ff4d6d', '#c724ff', '#e6f0ff', '#a7b4d6']

export default function MinesweeperGame() {
  const [board, setBoard] = useState(emptyBoard)
  const [started, setStarted] = useState(false)
  const [mode, setMode] = useState('reveal')
  const [status, setStatus] = useState('playing')
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (started && status === 'playing') {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [started, status])

  const flagsUsed = board.flat().filter((c) => c.flagged).length

  const restart = () => {
    clearInterval(timerRef.current)
    setBoard(emptyBoard())
    setStarted(false)
    setStatus('playing')
    setSeconds(0)
  }

  const revealAllMines = (b) => {
    b.forEach((row) => row.forEach((cell) => { if (cell.mine) cell.revealed = true }))
  }

  const checkWin = (b) => {
    const revealed = b.flat().filter((c) => c.revealed).length
    return revealed === ROWS * COLS - MINES
  }

  const handleCellClick = useCallback((r, c) => {
    if (status !== 'playing') return
    setBoard((prev) => {
      let next = prev.map((row) => row.map((cell) => ({ ...cell })))

      if (!started) {
        next = placeMines(next, r, c)
        setStarted(true)
      }

      const cell = next[r][c]
      if (cell.revealed) return next

      if (mode === 'flag') {
        cell.flagged = !cell.flagged
        return next
      }

      if (cell.flagged) return next

      if (cell.mine) {
        cell.revealed = true
        revealAllMines(next)
        setStatus('lost')
        clearInterval(timerRef.current)
        return next
      }

      floodReveal(next, r, c)
      if (checkWin(next)) {
        setStatus('won')
        clearInterval(timerRef.current)
      }
      return next
    })
  }, [status, started, mode])

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>Buscaminas</h1>
      <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 1.25rem' }}>
        9×9, 10 minas. Cambia a modo bandera para marcarlas.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700 }}>
        <span style={{ color: '#ff4d6d' }}>Minas: {MINES - flagsUsed}</span>
        <span style={{ color: '#a7b4d6' }}>Tiempo: {seconds}s</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setMode('reveal')}
          style={{ ...btnStyle('#00d9ff'), opacity: mode === 'reveal' ? 1 : 0.45 }}
        >
          Revelar
        </button>
        <button
          onClick={() => setMode('flag')}
          style={{ ...btnStyle('#ffd166'), opacity: mode === 'flag' ? 1 : 0.45, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <FaFlag size={11} /> Bandera
        </button>
        <button onClick={restart} style={btnStyle('#a7b4d6')}>Reiniciar</button>
      </div>

      <div
        style={{
          position: 'relative',
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: 3,
          background: '#11151c',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: 6,
        }}
      >
        {board.flat().map((cell, i) => {
          const r = Math.floor(i / COLS)
          const c = i % COLS
          return (
            <button
              key={i}
              onClick={() => handleCellClick(r, c)}
              disabled={status !== 'playing' && !cell.revealed}
              style={{
                width: '2.1rem',
                height: '2.1rem',
                borderRadius: 5,
                border: 'none',
                background: cell.revealed ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.09)',
                color: cell.mine ? '#ff4d6d' : NUMBER_COLORS[cell.adjacent],
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: status === 'playing' ? 'pointer' : 'default',
              }}
            >
              {cell.revealed
                ? (cell.mine ? <FaBomb size={12} /> : (cell.adjacent || ''))
                : (cell.flagged ? <FaFlag size={11} color="#ffd166" /> : '')}
            </button>
          )
        })}

        {status !== 'playing' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,10,15,0.15)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '0.75rem',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                pointerEvents: 'auto',
                background: 'rgba(10,10,15,0.92)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 9999,
                padding: '0.5rem 1.1rem',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: status === 'won' ? '#00ffa3' : '#ff4d6d',
              }}
            >
              {status === 'won' ? '¡Ganaste!' : 'Boom — game over'}
            </span>
          </div>
        )}
      </div>

      {status !== 'playing' && (
        <div style={{ marginTop: '1.25rem' }}>
          <button onClick={restart} style={btnStyle('#00ffa3')}>Jugar de nuevo</button>
        </div>
      )}
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
