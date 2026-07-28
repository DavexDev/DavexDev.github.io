import GamePageShell from '../components/GamePageShell'
import SudokuGame from '../components/SudokuGame'

export default function SudokuPage() {
  return (
    <GamePageShell title="Sudoku">
      <SudokuGame />
    </GamePageShell>
  )
}
