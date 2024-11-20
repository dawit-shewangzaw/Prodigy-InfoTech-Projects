import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 100);
      }, 100);
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, elapsedTime]);

  const startStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds}`;
  };

  const animationStyles = {
    animationPlayState: isRunning ? "running" : "paused",
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Stopwatch</h2>
      <div className="relative w-24 h-24">
        <div
          className="absolute border-4 border-blue-500 border-solid rounded-full w-full h-full"
          style={animationStyles}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <p className="text-2xl font-semibold mt-4">
            {formatTime(elapsedTime)}
          </p>
          {isRunning && (
            <button
              onClick={startStopwatch}
              className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Lap
            </button>
          )}
          <button
            onClick={startStopwatch}
            className="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;