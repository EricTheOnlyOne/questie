import logo from './logo.svg';
import './App.css';


function TabsButton() {
  return (
    <button className='Tabs-button'>
      Moin
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TabsButton></TabsButton>
      </header>
    </div>
  );
}

export default App;
