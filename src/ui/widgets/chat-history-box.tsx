import { useRef, useEffect } from "react";
import type { ChatHistory } from "../../model/game-logic";
import ChatHistoryItem from "../components/chat-history-item";

const ChatHistoryBox = ({
  chatHistory,
  addedStyle,
}: {
  chatHistory: ChatHistory;
  addedStyle?: string;
}) => {
  // Automatically scroll the last chat item into view upon rendering
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatHistory.length) {
      ref.current?.scrollIntoView({
        block: "end",
      });
    }
  }, [chatHistory.length]);

  const style =
    "w-full h-full sm:h-[410px] gap-2 p-4 py-0 overflow-y-auto no-scrollbar " +
    (addedStyle ? addedStyle : "");

  const InnerContent = () =>
    chatHistory.length > 0 ? (
      <div className="w-full mt-2 flex flex-col items-center">
        {chatHistory.map((chatHistoryItem, index) => (
          <ChatHistoryItem type={chatHistoryItem.type} key={index}>
            {chatHistoryItem.content}
          </ChatHistoryItem>
        ))}
      </div>
    ) : (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-gray-400">
          Первый участник вспоминает города...
        </span>
      </div>
    );

  return (
    <div className={style}>
      <InnerContent />
      <div ref={ref} />
    </div>
  );
};

export default ChatHistoryBox;
