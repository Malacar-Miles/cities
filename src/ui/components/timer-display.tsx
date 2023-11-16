import { useEffect, useState } from "react";

const REFRESH_INTERVAL = 200 // Display refresh timer in milliseconds
const DEFAULT_DISPLAY_VALUE = "2:00";

const TimerDisplay = ({
  getFormattedTime,
}: {
  getFormattedTime: () => string | undefined;
}) => {
  const [timerDisplay, setTimerDisplay] = useState("");

  useEffect(() => {
    setTimerDisplay(getFormattedTime() || DEFAULT_DISPLAY_VALUE);

    // Initialize periodic refresh
    const displayUpdater = setInterval(() => {
      setTimerDisplay(getFormattedTime() || DEFAULT_DISPLAY_VALUE);
    }, REFRESH_INTERVAL);
    return () => clearInterval(displayUpdater);
    // eslint-disable-next-line
  }, []);

  return (
    <span className="text-xl text-black font-medium">
      {timerDisplay}
    </span>
  );
};

export default TimerDisplay;
