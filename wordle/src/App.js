import './App.css';
import Keyboard from './Components/Keyboard/Keyboard';

function App() {
  return (
    <div className="app">
      <div className='header'>
        <h1>Wordle</h1>
        <div className='horizontal-line'/>
      </div>

      <Keyboard />
    </div>
  );
}

export default App;
