import ChatHistoryBox from "../widgets/chat-history-box";
import ChatInputBox from "../widgets/chat-input-box";
import type { GameDataAndControls } from "../../model/game-logic";

const Game = ({ gameData }: { gameData: GameDataAndControls }) => {
  const {
    gameState,
    chatHistory,
    currentLetter,
    getUsedCitiesAmount,
    addPlayerInput,
  } = gameData;

  const headerText =
    gameState !== "ai-turn"
      ? "Сейчас ваша очередь"
      : "Сейчас очередь соперника";

  const citiesAmount = getUsedCitiesAmount()

  return (
    <div className="flex flex-col w-full h-full">
      <h2 className="p-4">{headerText}</h2>
      <hr />
      <ChatHistoryBox chatHistory={chatHistory} />
      <p className="text-sm text-gray-400 text-center"> {citiesAmount > 0 && `Всего перечислено городов: ${citiesAmount}`}</p>
      <ChatInputBox
        addPlayerInput={addPlayerInput}
        gameState={gameState}
        currentLetter={currentLetter}
      />
    </div>
  );
};

export default Game;
