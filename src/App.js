import './App.css';
import Stopwatch from './Stopwatch.js';
import TabsButton from './TabsButton.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stopwatch />
        <div className="Input-row">
          <input type="text" className="Tabs-input" placeholder="Input 1" />
          <input type="text" className="Tabs-input" placeholder="Input 2" />
          <TabsButton text='Submit' />
        </div>
        <TabsButton text='Moin' onClick={() => console.log('Moin button clicked')} />
      </header>
    </div>
  );
}

export default App;