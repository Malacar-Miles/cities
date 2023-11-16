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
    // I have to use this complex solution with relative/absolute positioning
    // in order to give my chatbox container a fixed size and keep it non-flex,
    // which is required for scrolling to work, and at the same time keep my input
    // box "glued" to the bottom of the screen.
    <div className="flex flex-col w-full h-full relative pb-[100px]">
      <header className="p-4 flex justify-between">
        <h2>{headerText}</h2>
        <TimerDisplay getFormattedTime={getFormattedTime} />
      </header>
      <TimerBar getTimerPercentage={getTimerPercentage} />
      <ChatHistoryBox chatHistory={chatHistory} />
      <div className="w-full sm:w-[576px] h-[100px] p-4 pt-0 absolute left-0 bottom-0">
        <p className="text-sm text-gray-400 text-center mb-4">
          &zwnj;
          {citiesAmount > 0 && `Всего перечислено городов: ${citiesAmount}`}
        </p>
        <ChatInputBox
          addPlayerInput={addPlayerInput}
          gameState={gameState}
          currentLetter={currentLetter}
        />
      </div>
    </div>
  );
};

export default Game;
