import type { ChatHistory } from "../../model/game-logic";
import ChatHistoryItem from "../components/chat-history-item";

const ChatHistoryBox = ({ chatHistory }: { chatHistory: ChatHistory }) => {
  const ITEMS_TO_DISPLAY = 7;
  const chatHistoryToDisplay =
    chatHistory.length <= ITEMS_TO_DISPLAY
      ? chatHistory
      : chatHistory.slice(chatHistory.length - ITEMS_TO_DISPLAY);

  if (chatHistory.length > 0)
    return (
      <div className="w-full h-80 flex flex-col items-center gap-2 p-4">
        {chatHistoryToDisplay.map((chatHistoryItem, index) => (
          <ChatHistoryItem type={chatHistoryItem.type} key={index}>
            {chatHistoryItem.content}
          </ChatHistoryItem>
        ))}
      </div>
    );
  else
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <span className="text-gray-400">
          Первый участник вспоминает города...
        </span>
      </div>
    );
};

export default ChatHistoryBox;
