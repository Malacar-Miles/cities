const Button = ({
  type,
  isInactive = false,
  onClick,
  children,
}: {
  type: "normal" | "small";
  isInactive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const handleClick = () => {
    if (!isInactive && onClick) onClick();
  };

  let style = "flex items-center text-white";

  switch (type) {
    case "normal":
      style += " px-4 py-2 rounded";
      break;
    case "small":
      style += " w-8 h-8 shrink-0 rounded-md drop-shadow justify-center";
  }

  if (isInactive) style += " bg-gray-400";
  else style += " bg-violet-600";

  return <button className={style} onClick={handleClick}>{children}</button>;
};

export default Button;
