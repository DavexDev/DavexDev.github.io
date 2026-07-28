import GamePageShell from '../components/GamePageShell'
import CyberRiskDemo from '../components/CyberRiskDemo'

export default function CyberRiskPage() {
  return (
    <GamePageShell title="CyberRisk Predictor GT 2026">
      <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
        <CyberRiskDemo />
      </div>
    </GamePageShell>
  )
}
