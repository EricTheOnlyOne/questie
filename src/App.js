import './App.css';
import Stopwatch from './Stopwatch.js';
import AnimatedComponent from './AnimetedComponent.js';

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