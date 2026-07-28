import { useState, useEffect, useCallback, useMemo } from 'react'

const WORDS = [
  'ABRIR', 'ACOSO', 'ACTOR', 'ACUSO', 'AGUDO', 'AMIGO', 'ANCLA', 'ANDEN', 'ANGEL', 'ANTES',
  'ANUAL', 'APAGO', 'ARBOL', 'ARENA', 'ARMAS', 'ASADO', 'ASTRO', 'ATRAS', 'AUDIO', 'AULAS',
  'AVISO', 'AYUDA', 'BAILE', 'BAJAR', 'BALON', 'BANCO', 'BARCO', 'BARRO', 'BEBER', 'BESOS',
  'BOLSA', 'BONOS', 'BORDE', 'BOTAS', 'BRAZO', 'BRISA', 'BRUJA', 'BUENO', 'BURLA', 'BUSCO',
  'CABLE', 'CABRA', 'CAJAS', 'CALLE', 'CALOR', 'CAMPO', 'CANAL', 'CANTO', 'CAPAZ', 'CARGA',
  'CARNE', 'CARRO', 'CARTA', 'CASAS', 'CASCO', 'CIELO', 'CINCO', 'CLARO', 'CLASE', 'CLAVE',
  'CLIMA', 'COBRE', 'COCHE', 'COLOR', 'COMER', 'CORTE', 'COSTA', 'CREER', 'CRUCE', 'CUBOS',
  'CUERO', 'CUEVA', 'DEBER', 'DEDOS', 'DESEO', 'DONDE', 'DOBLE', 'DRAMA', 'DUDAS', 'DULCE',
  'ENERO', 'ENTRE', 'FRUTA', 'FUEGO', 'FUNDA', 'GATOS', 'GENTE', 'GOLPE', 'GRASA', 'GRUPO',
  'HABLA', 'HIELO', 'HOGAR', 'HORAS', 'HUMOR', 'IGUAL', 'JOVEN', 'JUEGO', 'JUNIO', 'JUSTO',
  'LARGO', 'LEGAL', 'LIBRE', 'LIBRO', 'LIMON', 'LINEA', 'LLAVE', 'LOBOS', 'LUCHA', 'LUGAR',
  'LUNES',
]
const WORD_SET = new Set(WORDS)
const MAX_GUESSES = 6

const KEY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

function evaluateGuess(guess, answer) {
  const n = answer.length
  const result = new Array(n).fill('absent')
  const pool = {}
  for (let i = 0; i < n; i++) {
    if (guess[i] === answer[i]) result[i] = 'correct'
    else pool[answer[i]] = (pool[answer[i]] || 0) + 1
  }
  for (let i = 0; i < n; i++) {
    if (result[i] === 'correct') continue
    const ch = guess[i]
    if (pool[ch] > 0) {
      result[i] = 'present'
      pool[ch] -= 1
    }
  }
  return result
}

const STATUS_COLOR = { correct: '#00ffa3', present: '#ffd166', absent: '#2a2f3a' }
const RANK = { correct: 3, present: 2, absent: 1, undefined: 0 }

function pickAnswer() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export default function WordleGame() {
  const [answer, setAnswer] = useState(pickAnswer)
  const [guesses, setGuesses] = useState([])
  const [current, setCurrent] = useState('')
  const [status, setStatus] = useState('playing')
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState('')

  const results = useMemo(() => guesses.map((g) => evaluateGuess(g, answer)), [guesses, answer])

  const keyStatus = useMemo(() => {
    const map = {}
    guesses.forEach((g, gi) => {
      g.split('').forEach((letter, i) => {
        const s = results[gi][i]
        if (RANK[s] > RANK[map[letter]]) map[letter] = s
      })
    })
    return map
  }, [guesses, results])

  const flashMessage = (msg) => {
    setMessage(msg)
    setShake(true)
    setTimeout(() => setShake(false), 350)
    setTimeout(() => setMessage(''), 1400)
  }

  const submitGuess = useCallback(() => {
    if (status !== 'playing') return
    if (current.length !== 5) { flashMessage('Faltan letras'); return }
    if (!WORD_SET.has(current)) { flashMessage('No está en la lista'); return }
    const newGuesses = [...guesses, current]
    setGuesses(newGuesses)
    setCurrent('')
    if (current === answer) {
      setStatus('won')
    } else if (newGuesses.length >= MAX_GUESSES) {
      setStatus('lost')
    }
  }, [current, guesses, answer, status])

  const pressKey = useCallback((key) => {
    if (status !== 'playing') return
    if (key === 'ENTER') { submitGuess(); return }
    if (key === 'BACK') { setCurrent((c) => c.slice(0, -1)); return }
    setCurrent((c) => (c.length < 5 ? c + key : c))
  }, [status, submitGuess])

  useEffect(() => {
    const onKeyDown = (e) => {
      const k = e.key.toUpperCase()
      if (k === 'ENTER') pressKey('ENTER')
      else if (k === 'BACKSPACE') pressKey('BACK')
      else if (/^[A-ZÑ]$/.test(k)) pressKey(k)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [pressKey])

  const restart = () => {
    setAnswer(pickAnswer())
    setGuesses([])
    setCurrent('')
    setStatus('playing')
    setMessage('')
  }

  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (i < guesses.length) return { letters: guesses[i].split(''), result: results[i] }
    if (i === guesses.length) return { letters: current.padEnd(5).split(''), result: null, active: true }
    return { letters: ['', '', '', '', ''], result: null }
  })

  return (
    <div style={{ padding: '1.5rem 1.25rem 3rem', maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#e6f0ff' }}>Adivina la palabra</h1>
      <p style={{ color: '#a7b4d6', fontSize: '0.85rem', margin: '0.4rem 0 1rem' }}>
        Tienes 6 intentos. Palabras de 5 letras, sin tildes ni Ñ.
      </p>

      <div style={{ minHeight: '1.2rem', color: '#ffd166', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {message}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${MAX_GUESSES}, 1fr)`,
          gap: 6,
          marginBottom: '1.5rem',
          animation: shake ? 'wordle-shake 0.3s ease' : 'none',
        }}
      >
        <style>{`@keyframes wordle-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`}</style>
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {row.letters.map((letter, ci) => (
              <div
                key={ci}
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: 6,
                  border: row.active ? '2px solid rgba(0,217,255,0.4)' : '1px solid rgba(255,255,255,0.12)',
                  background: row.result ? STATUS_COLOR[row.result[ci]] : 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: row.result ? (row.result[ci] === 'absent' ? '#a7b4d6' : '#0f0f0f') : '#e6f0ff',
                }}
              >
                {letter.trim()}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
        {KEY_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '0.3rem' }}>
            {row.map((key) => (
              <button
                key={key}
                onClick={() => pressKey(key)}
                style={{
                  minWidth: key === 'ENTER' || key === 'BACK' ? '2.6rem' : '1.9rem',
                  height: '2.6rem',
                  borderRadius: 6,
                  border: 'none',
                  background: keyStatus[key] ? STATUS_COLOR[keyStatus[key]] : 'rgba(255,255,255,0.09)',
                  color: keyStatus[key] && keyStatus[key] !== 'absent' ? '#0f0f0f' : '#e6f0ff',
                  fontWeight: 700,
                  fontSize: key === 'ENTER' || key === 'BACK' ? '0.65rem' : '0.85rem',
                  cursor: 'pointer',
                  padding: '0 0.3rem',
                }}
              >
                {key === 'ENTER' ? 'IR' : key === 'BACK' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {status !== 'playing' && (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ color: status === 'won' ? '#00ffa3' : '#ff4d6d', fontWeight: 800, fontSize: '1.05rem' }}>
            {status === 'won' ? '¡Correcto!' : `La palabra era ${answer}`}
          </p>
          <button onClick={restart} style={btnStyle('#00d9ff')}>Jugar de nuevo</button>
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
    padding: '0.55rem 1.2rem',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
  }
}
