import { useState, useEffect, useRef, useCallback } from 'react'

const DEFAULT_DATA = [
  {x:5,y:8},{x:10,y:12},{x:15,y:15},{x:20,y:18},{x:25,y:22},{x:30,y:26},
  {x:35,y:30},{x:40,y:34},{x:45,y:39},{x:50,y:44},{x:55,y:48},{x:60,y:53},
  {x:65,y:57},{x:70,y:62},{x:75,y:66},{x:80,y:70},{x:85,y:75},{x:90,y:79},
  {x:95,y:82},{x:100,y:86},{x:105,y:89},{x:110,y:91},{x:115,y:93},{x:120,y:95},
  {x:125,y:97},{x:130,y:98},{x:135,y:99},{x:140,y:100},
]

const LS_KEY = 'cyberrisk_data'

function calcRegression(data) {
  const n = data.length
  if (n < 2) return { a: 0, b: 0, r2: 0, corr: 0 }
  const sx  = data.reduce((s, d) => s + d.x, 0)
  const sy  = data.reduce((s, d) => s + d.y, 0)
  const sxy = data.reduce((s, d) => s + d.x * d.y, 0)
  const sx2 = data.reduce((s, d) => s + d.x * d.x, 0)
  const b   = (n * sxy - sx * sy) / (n * sx2 - sx * sx)
  const a   = (sy - b * sx) / n
  const yMean  = sy / n
  const ssTot  = data.reduce((s, d) => s + (d.y - yMean) ** 2, 0)
  const ssRes  = data.reduce((s, d) => s + (d.y - (a + b * d.x)) ** 2, 0)
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot
  return { a, b, r2, corr: Math.sqrt(Math.abs(r2)) }
}

function getRisk(pct) {
  if (pct <= 25) return { label: 'Bajo',    color: '#00d084' }
  if (pct <= 50) return { label: 'Medio',   color: '#ffd700' }
  if (pct <= 75) return { label: 'Alto',    color: '#ff8c00' }
  return                 { label: 'Crítico', color: '#ff4444' }
}

function parseCSV(text) {
  const lines = text.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return null
  const cols = lines[0].toLowerCase().replace(/\r/g, '').split(',').map(c => c.trim())
  const xi = cols.findIndex(c => c.includes('intentos')) >= 0
    ? cols.findIndex(c => c.includes('intentos'))
    : 0
  const yi = cols.findIndex(c => c.includes('riesgo')) >= 0 && cols.findIndex(c => c.includes('riesgo')) !== xi
    ? cols.findIndex(c => c.includes('riesgo'))
    : xi === 0 ? 1 : 0
  const result = []
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].replace(/\r/g, '').split(',')
    const x = parseFloat(parts[xi])
    const y = parseFloat(parts[yi])
    if (!isNaN(x) && !isNaN(y)) result.push({ x, y })
  }
  return result.length >= 2 ? result : null
}

export default function CyberRiskDemo() {
  const [attempts, setAttempts] = useState(75)
  const [dataset, setDataset] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length >= 2) return parsed
      }
    } catch (_) {}
    return DEFAULT_DATA
  })
  const [csvError, setCsvError]       = useState('')
  const [csvSuccess, setCsvSuccess]   = useState(false)
  const [isDragging, setIsDragging]   = useState(false)
  const [showFormat, setShowFormat]   = useState(false)
  const chartRef = useRef(null)
  const fileRef  = useRef(null)

  const model      = calcRegression(dataset)
  const prediction = Math.max(0, Math.min(100, model.a + model.b * attempts))
  const risk       = getRisk(prediction)

  useEffect(() => {
    if (!chartRef.current) return
    const xMax = Math.max(...dataset.map(d => d.x)) * 1.1
    const xLine = [0, xMax]
    const yLine = xLine.map(x => Math.max(0, Math.min(100, model.a + model.b * x)))

    import('plotly.js-dist-min').then(Plotly => {
      Plotly.react(chartRef.current, [
        {
          x: dataset.map(d => d.x),
          y: dataset.map(d => d.y),
          mode: 'markers',
          type: 'scatter',
          name: 'Datos',
          marker: { color: '#00d9ff', size: 7, opacity: 0.8 },
        },
        {
          x: xLine,
          y: yLine,
          mode: 'lines',
          type: 'scatter',
          name: 'Regresión',
          line: { color: '#7c6fff', width: 2 },
        },
        {
          x: [attempts],
          y: [prediction],
          mode: 'markers',
          type: 'scatter',
          name: 'Predicción',
          marker: { color: risk.color, size: 12, symbol: 'diamond', line: { color: '#fff', width: 1.5 } },
        },
      ], {
        paper_bgcolor: '#1a1a1a',
        plot_bgcolor: '#1a1a1a',
        font: { color: '#a7b4d6', family: 'Poppins, sans-serif', size: 11 },
        margin: { t: 20, r: 20, b: 40, l: 45 },
        xaxis: {
          title: 'Intentos fallidos',
          gridcolor: 'rgba(255,255,255,0.06)',
          zerolinecolor: 'rgba(255,255,255,0.1)',
          color: '#666',
        },
        yaxis: {
          title: 'Riesgo (%)',
          range: [0, 105],
          gridcolor: 'rgba(255,255,255,0.06)',
          zerolinecolor: 'rgba(255,255,255,0.1)',
          color: '#666',
        },
        legend: { font: { size: 10 }, bgcolor: 'rgba(0,0,0,0)' },
        showlegend: true,
      }, {
        responsive: true,
        displayModeBar: false,
      })
    })
  }, [dataset, model.a, model.b, attempts, prediction, risk.color])

  const loadData = useCallback((data) => {
    setDataset(data)
    localStorage.setItem(LS_KEY, JSON.stringify(data))
    setCsvSuccess(true)
    setCsvError('')
    setTimeout(() => setCsvSuccess(false), 4000)
  }, [])

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = parseCSV(e.target.result)
      if (!data) {
        setCsvError('No se pudo leer el archivo. Revisa que tenga el formato correcto.')
        setShowFormat(true)
        setCsvSuccess(false)
      } else {
        loadData(data)
        setShowFormat(false)
      }
    }
    reader.readAsText(file)
  }

  const handleRestore = () => {
    localStorage.removeItem(LS_KEY)
    setDataset(DEFAULT_DATA)
    setCsvSuccess(false)
    setCsvError('')
  }

  const isCustom = dataset !== DEFAULT_DATA

  return (
    <div style={{ background: '#0f0f0f', color: '#e6f0ff', padding: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ color: '#00d9ff', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
          Estadística Aplicada · {dataset.length} puntos · R² = {model.r2.toFixed(4)}
        </p>
        <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 800, margin: 0, color: '#fff' }}>
          CyberRisk Predictor GT 2026
        </h2>
        <p style={{ color: '#b0b0b0', fontSize: '0.8rem', marginTop: '0.2rem' }}>
          Regresión lineal:&nbsp;
          <code style={{ color: '#00d9ff', background: 'rgba(0,217,255,0.1)', padding: '1px 5px', borderRadius: 4 }}>
            y = {model.a.toFixed(2)} + {model.b.toFixed(4)}x
          </code>
          &nbsp;· Correlación: {model.corr.toFixed(4)}
          {isCustom && <span style={{ color: '#ffd700', marginLeft: '0.75rem', fontSize: '0.72rem' }}>★ Dataset personalizado</span>}
        </p>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.1rem', alignItems: 'start' }}>
        {/* Chart */}
        <div style={{
          flex: '1 1 320px', minWidth: 0,
          background: '#1a1a1a', borderRadius: 12,
          padding: '0.75rem',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div ref={chartRef} style={{ width: '100%', height: 300 }} />
        </div>

        {/* Controls + stats */}
        <div style={{ flex: '1 1 220px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {/* Risk indicator */}
          <div style={{
            background: '#1a1a1a', borderRadius: 12,
            padding: '1.1rem',
            border: `1px solid ${risk.color}33`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, color: risk.color, lineHeight: 1 }}>
              {prediction.toFixed(1)}%
            </div>
            <div style={{ color: risk.color, fontWeight: 700, fontSize: '0.82rem', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {risk.label}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 5, marginTop: '0.65rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${prediction}%`, background: risk.color, borderRadius: 99, transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* Slider */}
          <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.07)' }}>
            <label style={{ display: 'block', fontSize: '0.76rem', color: '#b0b0b0', marginBottom: '0.4rem', fontWeight: 600 }}>
              Intentos fallidos:&nbsp;<span style={{ color: '#00d9ff', fontWeight: 700 }}>{attempts}</span>
            </label>
            <input
              type="range" min={0} max={150} value={attempts}
              onChange={e => setAttempts(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#00d9ff', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.68rem', marginTop: '0.2rem' }}>
              <span>0</span><span>150</span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.76rem' }}>
            <p style={{ color: '#666', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.66rem' }}>
              Parámetros del modelo
            </p>
            {[
              ['R²',           model.r2.toFixed(4)],
              ['Correlación',  model.corr.toFixed(4)],
              ['Intercepto a', model.a.toFixed(4)],
              ['Pendiente b',  model.b.toFixed(4)],
              ['Datos',        `${dataset.length} puntos`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#a7b4d6' }}>
                <span>{label}</span>
                <span style={{ color: '#00d9ff', fontWeight: 700 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSV Upload */}
      <div
        style={{
          marginTop: '1.1rem',
          background: '#1a1a1a',
          borderRadius: 12,
          padding: '1.1rem',
          border: `2px dashed ${isDragging ? '#00d9ff' : 'rgba(255,255,255,0.1)'}`,
          transition: 'border-color 0.2s',
        }}
        onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]) }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.8rem', color: '#e6f0ff', marginBottom: '0.15rem' }}>
              Carga tu propio dataset (CSV)
            </p>
            <p style={{ color: '#555', fontSize: '0.7rem' }}>
              Columnas:&nbsp;
              <code style={{ color: '#00d9ff' }}>intentos_fallidos</code>,&nbsp;
              <code style={{ color: '#00d9ff' }}>riesgo_intrusion</code>
              &nbsp;· Arrastra aquí o usa el botón
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => fileRef.current?.click()}
              style={{ padding: '0.45rem 0.9rem', background: '#00d9ff', color: '#0f0f0f', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.76rem', cursor: 'pointer' }}
            >
              Subir CSV
            </button>
            <button
              onClick={handleRestore}
              style={{ padding: '0.45rem 0.9rem', background: 'transparent', color: '#b0b0b0', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, fontWeight: 600, fontSize: '0.76rem', cursor: 'pointer' }}
            >
              Restaurar original
            </button>
          </div>
          <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
        </div>

        {/* Status messages */}
        {csvError && (
          <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.25)', borderRadius: 8 }}>
            <p style={{ color: '#ff6b6b', fontSize: '0.76rem', fontWeight: 600 }}>✕ {csvError}</p>
          </div>
        )}
        {csvSuccess && (
          <p style={{ color: '#00d084', fontSize: '0.74rem', marginTop: '0.6rem' }}>✓ Dataset cargado — guardado en localStorage</p>
        )}

        {/* Format hint */}
        <div style={{ marginTop: '0.75rem' }}>
          <button
            onClick={() => setShowFormat(v => !v)}
            style={{ background: 'none', border: 'none', color: '#555', fontSize: '0.72rem', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <span style={{ fontSize: '0.65rem' }}>{showFormat ? '▾' : '▸'}</span>
            Ver formato esperado
          </button>
          {showFormat && (
            <div style={{ marginTop: '0.5rem', background: '#111', borderRadius: 8, padding: '0.75rem 1rem', border: '1px solid rgba(0,217,255,0.12)' }}>
              <p style={{ color: '#555', fontSize: '0.68rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ejemplo válido</p>
              <pre style={{ color: '#00d9ff', fontSize: '0.76rem', margin: 0, lineHeight: 1.7, fontFamily: 'monospace' }}>{`intentos_fallidos,riesgo_intrusion\n10,12\n25,22\n50,44\n80,70\n100,86\n140,100`}</pre>
              <ul style={{ color: '#666', fontSize: '0.7rem', marginTop: '0.6rem', paddingLeft: '1.1rem', lineHeight: 1.8 }}>
                <li>Primera fila: encabezados exactos (o cualquier nombre — se usan las primeras 2 columnas)</li>
                <li>Separador: coma <code style={{ color: '#a7b4d6' }}>,</code></li>
                <li>Mínimo 2 filas de datos</li>
                <li>Solo números, sin texto ni celdas vacías</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
