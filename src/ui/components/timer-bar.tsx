import { useEffect, useState } from "react";

const REFRESH_INTERVAL = 200; // Display refresh timer in milliseconds

const TimerBar = ({
  getTimerPercentage,
}: {
  getTimerPercentage: () => number;
}) => {
  const [timerDisplay, setTimerDisplay] = useState(0);

  useEffect(() => {
    setTimerDisplay(getTimerPercentage());

    // Initialize periodic refresh
    const displayUpdater = setInterval(() => {
      setTimerDisplay(getTimerPercentage());
    }, REFRESH_INTERVAL);
    return () => clearInterval(displayUpdater);
    // eslint-disable-next-line
  }, []);

  const style = { width: `${timerDisplay}%` };

  return (
    <div className="h-[4px] w-full flex bg-gray-100 ">
      <div className="bg-violet-300 h-full" style={style} />
    </div>
  );
};

export default TimerBar;
