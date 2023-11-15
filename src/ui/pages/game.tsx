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
  return (
    <div>
      <h2>Сейчас ваша очередь</h2>
      <hr />
      <ChatHistoryBox chatHistory={chatHistory} />
      <ChatInputBox
        addPlayerInput={addPlayerInput}
        gameState={gameState}
        currentLetter={currentLetter}
      />
    </div>
  );
};

export default Game;
