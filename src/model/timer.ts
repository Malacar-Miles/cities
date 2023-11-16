import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const TIMER_OFFSET = 120; // Time in seconds
const UPDATE_INTERVAL = 1000; // Time in milliseconds

const createTimer = () => {
  const startTime = dayjs();
  const endTime = startTime.add(TIMER_OFFSET, "second");
  return { startTime, endTime };
};

type Timer = ReturnType<typeof createTimer>;

export const useTimer = () => {
  const [timer, setTimer] = useState<Timer | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    const newTimer = createTimer();
    setTimer(newTimer);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(null);
  };

  const checkIfTimerExpired = () => {
    return timer ? timer.endTime.diff(dayjs()) <= 0 : false;
  };

  const getFormattedTime = () => {
    if (!timer) return;
    const remainingSeconds = timer.endTime.diff(dayjs(), "second");
    const remainingDuration = dayjs.duration(remainingSeconds, "seconds");
    return remainingDuration.format("mm:ss");
  };

  const getTimerPercentage = () => {
    // Returns the percentage of remaining time,
    // to be used with the timer bar indicator
    if (!timer) return 100;
    const remainingSeconds = timer.endTime.diff(dayjs(), "second");
    if (remainingSeconds < 0) return 0;
    return Math.round(100 * remainingSeconds / TIMER_OFFSET);
  };

  const initializeTimer = () => {
    if (!isRunning || !timer) return;

    // Run this function every second
    const timerUpdater = setInterval(() => {
      if (checkIfTimerExpired()) {
        stopTimer();
        clearInterval(timerUpdater);
      }
    }, UPDATE_INTERVAL);
    return () => {
      clearInterval(timerUpdater);
    };
  };
  // eslint-disable-next-line
  useEffect(initializeTimer, [isRunning]);

  return {
    startTimer,
    stopTimer,
    resetTimer,
    checkIfTimerExpired,
    getFormattedTime,
    getTimerPercentage,
  };
};
