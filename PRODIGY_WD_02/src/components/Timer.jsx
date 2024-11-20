import React, { useState, useEffect } from 'react';

const Timer = ({ inputTime }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(inputTime * 60000);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    } else if (!isRunning && remainingTime !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setRemainingTime(inputTime * 60000);
    setIsRunning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetTimer();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const animationStyles = {
    animationDuration: `${inputTime}m`,
    animationPlayState: isRunning ? "running" : "paused",
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Timer</h2>
      <div className="relative w-24 h-24">
        <div
          className="absolute border-4 border-blue-500 border-solid rounded-full w-full h-full"
          style={animationStyles}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <p className="text-2xl font-semibold mt-4">
            {formatTime(remainingTime)}
          </p>
          <button
            onClick={toggleTimer}
            className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;