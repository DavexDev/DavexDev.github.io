import GamePageShell from '../components/GamePageShell'
import HanoiGame from '../components/HanoiGame'

export default function HanoiPage() {
  return (
    <GamePageShell title="Torre de Hanoi">
      <HanoiGame />
    </GamePageShell>
  )
}
