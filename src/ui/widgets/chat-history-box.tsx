import type { ChatHistory } from "../../model/game-logic";
import ChatHistoryItem from "../components/chat-history-item";

const ChatHistoryBox = ({ chatHistory }: { chatHistory: ChatHistory }) => {
  const ITEMS_TO_DISPLAY = 9;
  const chatHistoryToDisplay =
    chatHistory.length <= ITEMS_TO_DISPLAY
      ? chatHistory
      : chatHistory.slice(chatHistory.length - ITEMS_TO_DISPLAY);

  return (
    <div className="w-full h-80">
      {chatHistoryToDisplay.map((chatHistoryItem, index) => (
        <ChatHistoryItem type={chatHistoryItem.type} key={index}>
          {chatHistoryItem.content}
        </ChatHistoryItem>
      ))}
    </div>
  );
};

export default ChatHistoryBox;
