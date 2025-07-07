import React, { useState, useEffect, useRef } from 'react';
import TabsButton from './TabsButton';

function Pomodoro() {
  const [activeTab, setActiveTab] = useState('Focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const tabs = [
    { name: 'Focus', duration: 25 * 60, timerClass: 'focus-timer' },
    { name: 'Short Break', duration: 5 * 60, timerClass: 'short-break-timer' },
    { name: 'Long Break', duration: 15 * 60, timerClass: 'long-break-timer' },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    setTimeLeft(tab.duration);
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const getTimerClass = () => {
    const tab = tabs.find((t) => t.name === activeTab);
    return tab ? tab.timerClass : '';
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current); // cleanup on unmount
  }, []);

  return (
    <div className="col-container">
      <div className="header">Pomodoro</div>
      <div className="Control-Wrapper">
        <div class="times-wrapper">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`minimal ${activeTab === tab.name ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className={`timer-display ${getTimerClass()}`}>
          {formatTime(timeLeft)}
        </div>
        <TabsButton outerClass="wrapper" text={isRunning ? 'Stop' : 'Start'} onClick={handleStartStop} />
      </div>
    </div>
  );
}

export default Pomodoro;
