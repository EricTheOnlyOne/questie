import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TabsButton from './TabsButton';
import { faUndoAlt, faCirclePlay, faCirclePause, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Stopwatch() {
  const [toggleButtonIcon, setToggleButtonIcon] = useState(faCirclePlay);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [shouldGlow, setShouldGlow] = useState(false); // New state for glow animation
  const startTime = useRef(null);
  const prevHours = useRef(0); // Ref to keep track of previous minutes

  useEffect(() => {
    let animationFrameId;

    const updateTimer = (currentTime) => {
      if (!startTime.current) startTime.current = currentTime;
      const elapsed = currentTime - startTime.current + accumulatedTime;
      setTime(elapsed);
      const totalSeconds = Math.floor(elapsed / 1000);
      const hours = Math.floor(totalSeconds / 600);

      if (hours !== prevHours.current) {
        prevHours.current = hours;
        setShouldGlow(true); // Trigger glow animation
      }

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

  useEffect(() => {
    if (shouldGlow) {
      const timer = setTimeout(() => setShouldGlow(false), 1000); // Reset glow after animation
      return () => clearTimeout(timer);
    }
  }, [shouldGlow]);

  const toggleWatch = () => {
    if (isActive) {
      setAccumulatedTime(time);
      setIsActive(false);
      setToggleButtonIcon(faCirclePlay);
    } else {
      setIsActive(true);
      setToggleButtonIcon(faCirclePause);
    }
  };

  const reset = () => {
    setTime(0);
    setAccumulatedTime(0);
    setIsActive(false);
    setToggleButtonIcon(faCirclePlay);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format milliseconds to always have two digits
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return hours > 0
      ? `${hours}h ${formattedMinutes}m ${formattedSeconds}.${formattedMilliseconds}s`
      : minutes > 0
        ? `${formattedMinutes}m ${formattedSeconds}.${formattedMilliseconds}s`
        : `${formattedSeconds}.${formattedMilliseconds}s`;
  };

  return (
    <div className='Stopwatch'>
      <div className='Stopwatch-input-and-controls'>
        <div className="Input-row">
          <input type="text" className="Tabs-input" placeholder="Reference" />
          <input type="text" className="Tabs-input" placeholder="Activity" />
        </div>
        <div className="Stopwatch-buttons">
          <TabsButton icon={toggleButtonIcon} onClick={toggleWatch} className='icon-button' />
          <TabsButton icon={faUndoAlt} onClick={reset} className='icon-button' />
        </div>
      </div>
      <div className='time-save-container'>
        <h1 className={shouldGlow ? 'glow' : ''} style={{margin: 0}}>{formatTime(time)}</h1>
        <TabsButton text='Save' className='height-fit-content'/>
      </div>
    </div>
  );
}

export default Stopwatch;
