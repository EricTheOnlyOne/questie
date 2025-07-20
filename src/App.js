import './App.css';
import { useState, useEffect } from 'react';
import Stopwatch from './Components/Stopwatch.js';
import AnimatedComponent from './Components/AnimetedComponent.js';
import Pomodoro from './Components/Pomodoro.js';
import Quests from './Components/Quests.js';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage === 0) {
      setCurrentPage(1); // Swipe left to go to Quests
    }
    if (isRightSwipe && currentPage === 1) {
      setCurrentPage(0); // Swipe right to go to Timer
    }
  };

  if (isMobile) {
    return (
      <AnimatedComponent>
        <div className="App">
          <div 
            className="mobile-container" 
            style={{ transform: `translateX(-${currentPage * 50}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="mobile-page">
              <Pomodoro />
            </div>
            <div className="mobile-page">
              <Quests />
            </div>
          </div>
          
          <div className="mobile-nav">
            <button 
              className={`mobile-nav-btn ${currentPage === 0 ? 'active' : ''}`}
              onClick={() => handlePageChange(0)}
            >
              Timer
            </button>
            <button 
              className={`mobile-nav-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(1)}
            >
              Quests
            </button>
          </div>
        </div>
        <p className="source">Inspired by pomofocus.io</p>
      </AnimatedComponent>
    );
  }

  return (
    <AnimatedComponent>
      <div className="App">
        <Pomodoro/>
        <Quests />
      </div>
      <p className="source">Inspired by pomofocus.io</p>
    </AnimatedComponent>
  );
}

export default App;