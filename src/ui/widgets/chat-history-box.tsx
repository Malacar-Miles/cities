import type { ChatHistory } from "../../model/game-logic";
import ChatHistoryItem from "../components/chat-history-item";

const ChatHistoryBox = ({ chatHistory }: { chatHistory: ChatHistory }) => {
  return (
    <div className="w-full h-80">
      {chatHistory.map((chatHistoryItem, index) => (
        <ChatHistoryItem type={chatHistoryItem.type} key={index}>
          {chatHistoryItem.content}
        </ChatHistoryItem>
      ))}
    </div>
  );
};

export default ChatHistoryBox;
