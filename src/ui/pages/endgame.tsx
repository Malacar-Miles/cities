import type { GameState } from "../../model/game-logic";
import Button from "../components/button";

const EndgameScreen = ({
  gameState,
  getUsedCitiesAmount,
  getLastUsedCity,
  startNewGame,
}: {
  gameState: GameState;
  getUsedCitiesAmount: () => number;
  getLastUsedCity: () => string;
  startNewGame: () => void;
}) => {
  const headerText =
    gameState === "win"
      ? "Поздравляем вас с победой!\nВаш противник не вспомнил нужный город!"
      : "К сожалению, ваше время вышло!\nВаш противник победил!";

  return (
    <div className="w-full">
      <h2>{headerText}</h2>
      <p>Всего было перечислено городов: {getUsedCitiesAmount()}</p>
      <p>Последний город, названный победителем</p>
      <p>Очень неплохой результат!</p>
      <p className="font-bold capitalize">{getLastUsedCity()}</p>
      <Button type="normal" onClick={startNewGame}>
        Начать новую игру
      </Button>
    </div>
  );
};

export default EndgameScreen;
