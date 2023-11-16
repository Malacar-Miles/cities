import { useEffect, useState } from "react";
import {
  getLastLetter,
  validateCity,
  checkIfCityWasUsed,
  checkIfInputStartsWithLetter,
  getAllCitiesStartingWithLetter,
} from "./helper-functions";
import { useTimer } from "./timer";

export type GameState =
  | "intro"
  | "first-turn"
  | "player-turn"
  | "ai-turn"
  | "win"
  | "lose";

export type ChatHistoryItemType = "player-message" | "ai-message" | "hint";

export type ChatHistoryItem = {
  content: string;
  type: ChatHistoryItemType;
};

export type ChatHistory = ChatHistoryItem[];

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [chatHistory, setChatHistory] = useState<ChatHistory>([]);
  const [currentLetter, setCurrentLetter] = useState("");
  const [usedCities, setUsedCities] = useState<string[]>([]);

  const {
    startTimer,
    stopTimer,
    resetTimer,
    checkIfTimerExpired,
    getFormattedTime,
  } = useTimer();

  const getUsedCitiesAmount = () => usedCities.length;
  const getLastUsedCity = () => usedCities[usedCities.length - 1];

  const clearChatHistory = () => setChatHistory([]);

  const addAiMessageToChat = (message: string) => {
    const newChatHistory = [...chatHistory];
    newChatHistory.push({
      type: "ai-message",
      content: message,
    });
    setChatHistory(newChatHistory);
  };

  const addPlayerMessageToChat = (
    playerMessage: string,
    errorMessage?: string
  ) => {
    const newChatHistory = [...chatHistory];
    newChatHistory.push({
      type: "player-message",
      content: playerMessage,
    });
    if (errorMessage)
      newChatHistory.push({
        type: "hint",
        content: errorMessage,
      });
    setChatHistory(newChatHistory);
  };

  const addUsedCity = (city: string) => {
    const newUsedCities = [...usedCities];
    newUsedCities.push(city.toLowerCase());
    setUsedCities(newUsedCities);
  };

  const startNewGame = () => {
    console.log("startNewGame");
    resetTimer();
    clearChatHistory();
    setUsedCities([]);
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

    // Check for any possible player error. If an error is found, put player
    // message in chat, followed by the error message.
    if (
      gameState !== "first-turn" &&
      !checkIfInputStartsWithLetter(playerInput, currentLetter)
    ) {
      addPlayerMessageToChat(
        playerInput,
        `Это слово не начинается на букву "${currentLetter.toUpperCase()}"`
      );
      return;
    }
    if (!validateCity(playerInput)) {
      addPlayerMessageToChat(
        playerInput,
        "В нашей базе данных нет города с таким названием"
      );
      return;
    }
    if (checkIfCityWasUsed(playerInput, usedCities)) {
      addPlayerMessageToChat(playerInput, "Этот город уже был назван");
      return;
    }

    // Now that we know that the input is valid, put player message in chat,
    // update the game logic to start the AI turn.
    addPlayerMessageToChat(playerInput);
    const lastLetter = getLastLetter(playerInput) as string;
    setCurrentLetter(lastLetter);
    addUsedCity(playerInput);
    initiateAiTurn();
  };

  const initiateAiTurn = () => {
    setGameState("ai-turn");
    console.log("initiateAiTurn");
  };

  const initiatePlayerTurn = () => {
    console.log("initiatePlayerTurn");
    setGameState("player-turn");
  };

  useEffect(() => {
    // We have to use useEffect for this code in order to
    // avoid the issue where it executes before currentValue and
    // usedCities get updated with new values.
    if (gameState === "ai-turn") {
      const aiResponse = () => {
        console.log("aiResponse");
        // Get all cities starting with the current letter
        const validCities = getAllCitiesStartingWithLetter(currentLetter);

        // In the resulting array, find the first city that hasn't been used yet
        const response = validCities.find(
          (city) => !checkIfCityWasUsed(city, usedCities)
        );

        // If a response was found, output it into chat and initiate player turn
        if (response) {
          console.log(response);
          addAiMessageToChat(response);
          setCurrentLetter(getLastLetter(response) as string);
          addUsedCity(response);
          initiatePlayerTurn();
        } else {
          // If the AI failed to find a valid response, initiate the "win" state
          setGameState("win");
          stopTimer();
          console.log("win");
        }
      };

      // Wait for a random delay between 3 and 6 seconds
      // and then execute aiResponse
      const randomDelay = (Math.random() + 1) * 3000;
      setTimeout(aiResponse, randomDelay);
    }
  }, [gameState]);

  useEffect(() => {
    // If a new player turn or UI turn just started,
    // create a new timer
    if (
      gameState === "ai-turn" ||
      gameState === "first-turn" ||
      gameState === "player-turn"
    ) {
      startTimer();
      console.log("startTimer");
    }
  }, [gameState]);

  useEffect(() => {
    // Whenever formattedTime updates, check if the timer has expired,
    // and if it's the player's turn, trigger the "lose" state.
    if (
      (gameState === "first-turn" || gameState === "player-turn") &&
      checkIfTimerExpired()
    ) {
      setGameState("lose");
    }
  }, [getFormattedTime()]);

  // Return an object that contains the data and functions
  // that will be used by UI components.
  return {
    gameState,
    chatHistory,
    currentLetter,
    getUsedCitiesAmount,
    startNewGame,
    addPlayerInput,
    getLastUsedCity,
    getFormattedTime,
  };
};

export type GameDataAndControls = ReturnType<typeof useGameLogic>;
