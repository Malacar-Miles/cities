import Intro from "./pages/intro";
import Game from "./pages/game";
import { useGameLogic } from "../model/game-logic";

function App() {
  const gameData = useGameLogic();
  const { gameState } = gameData;

  const CurrentPage = () => {
    if (gameState === "intro")
      return <Intro startNewGame={gameData.startNewGame} />;
    if (
      gameState === "first-turn" ||
      gameState === "ai-turn" ||
      gameState === "player-turn"
    )
      return <Game gameData={gameData} />;
    throw new Error(`Invalid game state: "${gameState}"`);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <main className="w-[576px]">
        <CurrentPage />
      </main>
    </div>
  );
}

export default App;
