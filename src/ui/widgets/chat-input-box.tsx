import Button from "../components/button";
import type { GameState } from "../../model/game-logic";
import { ReactComponent as SendIcon } from "../../assets/send-icon.svg";
import { useState } from "react";

const ChatInputBox = ({
  addPlayerInput,
  gameState,
  currentLetter,
}: {
  addPlayerInput: (playerInput: string) => void;
  gameState: GameState;
  currentLetter: string;
}) => {
  const [inputBoxContent, setInputBoxContent] = useState("");

  const handleInputChange = (event: React.SyntheticEvent) => {
    setInputBoxContent((event.target as HTMLInputElement).value);
  };

  const handleButtonClick = () => {
    addPlayerInput(inputBoxContent);
    setInputBoxContent("");
  };

  const placeholderText =
    gameState === "first-turn"
      ? "Напишите любой город, например: где вы живете?"
      : gameState === "ai-turn"
      ? "Ожидаем ответа соперника..."
      : `Знаете город на букву "${currentLetter}"?`;

  return (
    <div className="w-full h-12 shrink-0 flex items-center p-3 gap-3 rounded-md text-gray-700 bg-gray-100">
      <input
        type="text"
        placeholder={placeholderText}
        value={inputBoxContent}
        onChange={handleInputChange}
        className="grow bg-transparent outline-none"
      ></input>
      <Button type="small" onClick={handleButtonClick}>
        <SendIcon />
      </Button>
    </div>
  );
};

export default ChatInputBox;
