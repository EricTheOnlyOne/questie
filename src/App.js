import './App.css';
import Stopwatch from './Components/Stopwatch.js';
import AnimatedComponent from './Components/AnimetedComponent.js';
import Pomodoro from './Components/Pomodoro.js';
import Quests from './Components/Quests.js';

function App() {
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