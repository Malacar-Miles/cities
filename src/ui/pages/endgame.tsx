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
      ? "Поздравляем тебя с победой!\nТвой противник не вспомнил нужный город!"
      : "К сожалению, твое время вышло!\nТвой противник победил!";

  return (
    <div className="w-full">
      <h2>{headerText}</h2>
      <p>Всего было перечислено городов: {getUsedCitiesAmount()}</p>
      <p>Очень неплохой результат!</p>
      <p>Последний город, названный победителем</p>
      <p className="font-bold capitalize">{getLastUsedCity()}</p>
      <Button type="normal" onClick={startNewGame}>
        Начать новую игру
      </Button>
    </div>
  );
};

export default EndgameScreen;
