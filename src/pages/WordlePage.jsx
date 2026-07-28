import GamePageShell from '../components/GamePageShell'
import WordleGame from '../components/WordleGame'

export default function WordlePage() {
  return (
    <GamePageShell title="Adivina la palabra">
      <WordleGame />
    </GamePageShell>
  )
}
