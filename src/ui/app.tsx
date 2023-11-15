import Intro from "./pages/intro";
import Game from "./pages/game";
import { useGameLogic } from "../model/game-logic";
import EndgameScreen from "./pages/endgame";

function App() {
  const gameData = useGameLogic();
  const { gameState, getUsedCitiesAmount, getLastUsedCity, startNewGame } =
    gameData;

  const CurrentPage = () => {
    if (gameState === "intro")
      return <Intro startNewGame={gameData.startNewGame} />;
    if (
      gameState === "first-turn" ||
      gameState === "ai-turn" ||
      gameState === "player-turn"
    )
      return <Game gameData={gameData} />;
    if (gameState === "win" || gameState === "lose")
      return (
        <EndgameScreen
          gameState={gameState}
          getUsedCitiesAmount={getUsedCitiesAmount}
          getLastUsedCity={getLastUsedCity}
          startNewGame={startNewGame}
        />
      );
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
