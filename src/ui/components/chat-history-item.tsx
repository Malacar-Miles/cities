import type { ChatHistoryItemType } from "../../model/game-logic";

const ChatHistoryItem = ({
  type,
  children,
}: {
  type: ChatHistoryItemType;
  children: React.ReactNode;
}) => {
  let style = "flex py-1.5 px-4";
  switch (type) {
    case "ai-message":
      style += " text-gray-700 bg-violet-50";
      break;
    case "player-message":
      style += " text-white bg-violet-500";
      break;
    case "hint":
      style += " text-gray-400";
  }
  return <p className={style}>{children}</p>;
};

export default ChatHistoryItem;
