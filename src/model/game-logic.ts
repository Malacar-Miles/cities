import { useState } from "react";
import {
  getLastLetter,
  validateCity,
  checkIfCityWasUsed,
  checkIfInputStartsWithLetter,
  getAllCitiesStartingWithLetter,
} from "./helper-functions";

export type GameState =
  | "intro"
  | "first-turn"
  | "player-turn"
  | "ai-turn"
  | "win"
  | "lose";

export type ChatHistoryItem = {
  content: string;
  type: "player-message" | "ai-message" | "hint";
};

export type ChatHistory = ChatHistoryItem[];

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [chatHistory, setChatHistory] = useState<ChatHistory>([]);
  const [currentLetter, setCurrentLetter] = useState("");
  const [usedCities, setUsedCities] = useState<string[]>([]);

  const getUsedCitiesAmount = () => usedCities.length;

  const clearChatHistory = () => setChatHistory([]);

  const addChatHistoryItem = (chatHistoryItem: ChatHistoryItem) => {
    const newChatHistory = [...chatHistory];
    newChatHistory.push(chatHistoryItem);
    setChatHistory(newChatHistory);
  };

  const addErrorMessageToChat = (message: string) => {
    addChatHistoryItem({
      type: "hint",
      content: message,
    });
  };

  const addUsedCity = (city: string) => {
    const newUsedCities = [...usedCities];
    newUsedCities.push(city.toLowerCase());
    setUsedCities(newUsedCities);
  };

  const startNewGame = () => {
    clearChatHistory();
    setGameState("first-turn");
    setCurrentLetter("");
  };

  const addPlayerInput = (playerInput: string) => {
    // Check if player input should be accepted in the current state
    if (gameState !== "first-turn" && gameState !== "player-turn")
      throw new Error(
        `Player input should not be accepted while gameState is "${gameState}"`
      );

    // Remove leading and trailing whitespaces from playerInput
    playerInput = playerInput.trim();

    // Add player input to chat, even if it's invalid
    addChatHistoryItem({
      type: "player-message",
      content: playerInput,
    });

    // Check for any possible player error. If an error is found, output a message in chat.
    if (
      gameState !== "first-turn" &&
      !checkIfInputStartsWithLetter(playerInput, currentLetter)
    ) {
      addErrorMessageToChat(
        `Это слово не начинается на букву "${currentLetter.toUpperCase()}"`
      );
      return;
    }
    if (!validateCity(playerInput)) {
      addErrorMessageToChat("В нашей базе данных нет города с таким названием");
      return;
    }
    if (checkIfCityWasUsed(playerInput, usedCities)) {
      addErrorMessageToChat("Этот город уже был назван");
      return;
    }

    // Now that we know that the input is valid, update the game logic to start the AI turn.
    setCurrentLetter(getLastLetter(playerInput) as string);
    addUsedCity(playerInput);
    initiateAiTurn();
  };

  const initiateAiTurn = () => {
    setGameState("ai-turn");

    const aiResponse = () => {
      // Get all cities starting with the current letter
      const validCities = getAllCitiesStartingWithLetter(currentLetter);

      // In the resulting array, find the first city that hasn't been used yet
      const response = validCities.find(
        (city) => !checkIfCityWasUsed(city, usedCities)
      );

      // If the response was found, output it into chat and initiate player turn
      if (response) {
        addChatHistoryItem({
          type: "ai-message",
          content: response,
        });
        setCurrentLetter(getLastLetter(response) as string);
        addUsedCity(response);
        initiatePlayerTurn();
      }

      // If the AI failed to find a valid response, initiate the "win" state
      setGameState("win");
    };

    // Wait for a random delay between 5 and 10 seconds
    // and then execute aiResponse
    const randomDelay = (Math.random() + 1) * 5000;
    setTimeout(aiResponse, randomDelay);
  };

  const initiatePlayerTurn = () => {
    setGameState("player-turn");
  };

  // Return the object that contains the data and functions
  // that will be used by UI components.
  return {
    gameState: gameState,
    chatHistory: chatHistory,
    currentLetter: currentLetter,
    getUsedCitiesAmount: getUsedCitiesAmount,
    startNewGame: startNewGame,
    addPlayerInput: addPlayerInput,
  };
};

export type GameDataAndControls = ReturnType<typeof useGameLogic>;
