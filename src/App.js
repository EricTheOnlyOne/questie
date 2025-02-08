import './App.css';
import Stopwatch from './Components/Stopwatch.js';
import AnimatedComponent from './Components/AnimetedComponent.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <AnimatedComponent>
        <Stopwatch />
      </AnimatedComponent>
      </header>
    </div>
  );
}

export default App;