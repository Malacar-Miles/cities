import ChatHistoryBox from "../widgets/chat-history-box";
import ChatInputBox from "../widgets/chat-input-box";
import TimerDisplay from "../components/timer-display";
import TimerBar from "../components/timer-bar";
import type { GameDataAndControls } from "../../model/game-logic";

const Game = ({ gameData }: { gameData: GameDataAndControls }) => {
  const {
    gameState,
    chatHistory,
    currentLetter,
    getUsedCitiesAmount,
    addPlayerInput,
    getFormattedTime,
    getTimerPercentage,
  } = gameData;

  const headerText =
    gameState !== "ai-turn"
      ? "Сейчас ваша очередь"
      : "Сейчас очередь соперника";

  const citiesAmount = getUsedCitiesAmount();

  return (
    <div className="flex flex-col w-full h-full">
      <header className="p-4 flex justify-between">
        <h2>{headerText}</h2>
        <TimerDisplay getFormattedTime={getFormattedTime} />
      </header>
      <TimerBar getTimerPercentage={getTimerPercentage} />
      <ChatHistoryBox chatHistory={chatHistory} />
      <p className="text-sm text-gray-400 text-center">
        {" "}
        {citiesAmount > 0 && `Всего перечислено городов: ${citiesAmount}`}
      </p>
      <ChatInputBox
        addPlayerInput={addPlayerInput}
        gameState={gameState}
        currentLetter={currentLetter}
      />
    </div>
  );
};

export default Game;
