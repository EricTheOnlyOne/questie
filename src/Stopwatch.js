import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TabsButton from './TabsButton';


function Stopwatch() {
    const [time, setTime] = useState(3590000);
    const [isActive, setIsActive] = useState(false);
    const [accumulatedTime, setAccumulatedTime] = useState(0);
    const startTime = useRef(null);
  
    useEffect(() => {
      let animationFrameId;
  
      const updateTimer = (currentTime) => {
        if (!startTime.current) startTime.current = currentTime;
        const elapsed = currentTime - startTime.current + accumulatedTime;
        setTime(elapsed);
        if (isActive) {
          animationFrameId = requestAnimationFrame(updateTimer);
        }
      };
  
      if (isActive) {
        animationFrameId = requestAnimationFrame(updateTimer);
      } else {
        startTime.current = null;
      }
  
      return () => cancelAnimationFrame(animationFrameId);
    }, [isActive, accumulatedTime]);
  
    const start = () => {
      setIsActive(true);
    };
  
    const stop = () => {
      setIsActive(false);
      setAccumulatedTime(time);
    };
  
    const reset = () => {
      setTime(3590000);
      setAccumulatedTime(3590000);
      setIsActive(false);
    };
  
    const formatTime = (time) => {
      const milliseconds = (time % 1000) / 10;
      const totalSeconds = Math.floor(time / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      return hours > 0
      ? `${hours}h ${minutes}m ${seconds}.${milliseconds.toFixed(0)}s`
      : minutes > 0
        ? `${minutes}m ${seconds}.${milliseconds.toFixed(0)}s`
        : `${seconds}.${milliseconds.toFixed(0)}s`;
    };
  
    return (
      <div className='Stopwatch'>
        <h1>{formatTime(time)}</h1>
        <div className="Stopwatch-buttons">
          <TabsButton text='Start' onClick={start} />
          <TabsButton text='Stop' onClick={stop} />
          <TabsButton text='Reset' onClick={reset} />
        </div>
      </div>
    );
  }

  export default Stopwatch;