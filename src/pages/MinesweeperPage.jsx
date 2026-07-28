import GamePageShell from '../components/GamePageShell'
import MinesweeperGame from '../components/MinesweeperGame'

export default function MinesweeperPage() {
  return (
    <GamePageShell title="Buscaminas">
      <MinesweeperGame />
    </GamePageShell>
  )
}
