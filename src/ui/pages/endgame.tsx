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
    <div className="w-full p-10 flex flex-col gap-8 items-center whitespace-pre-wrap text-center text-xl">
      <h2>{headerText}</h2>
      <p>
        Всего было перечислено городов: {getUsedCitiesAmount()}
        {"\n"}Очень неплохой результат!
      </p>
      <div className="flex flex-col gap-1.5">
        <p>Последний город, названный победителем:</p>
        <p className="font-bold capitalize">{getLastUsedCity()}</p>
      </div>
      <Button type="normal" onClick={startNewGame} className="text-base">
        Начать новую игру
      </Button>
    </div>
  );
};

export default EndgameScreen;
