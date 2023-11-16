import type { ChatHistory } from "../../model/game-logic";
import ChatHistoryItem from "../components/chat-history-item";

const ChatHistoryBox = ({ chatHistory }: { chatHistory: ChatHistory }) => {

  if (chatHistory.length > 0)
    return (
      <div className="w-full sm:grow sm:h-[410px] flex flex-col items-center justify-end gap-2 p-4 py-0 overflow-y-auto">
        {chatHistory.map((chatHistoryItem, index) => (
          <ChatHistoryItem type={chatHistoryItem.type} key={index}>
            {chatHistoryItem.content}
          </ChatHistoryItem>
        ))}
      </div>
    );
  else
    return (
      <div className="w-full sm:grow sm:h-[410px] flex justify-center items-center">
        <span className="text-gray-400">
          Первый участник вспоминает города...
        </span>
      </div>
    );
};

export default ChatHistoryBox;
