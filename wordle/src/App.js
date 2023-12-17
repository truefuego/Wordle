import { useEffect } from 'react';
import './App.css';
import Keyboard from './Components/Keyboard/Keyboard';
import LetterGrid from './Components/LetterGrid/LetterGrid';
import { wordStore } from './Components/wordStore';

function App() {
  const {targetWord, guessedWords, guessingWord, initializeWord} = wordStore((state) => ({guessedWords: state.guessedWords, targetWord: state.targetWord, initializeWord: state.initializeWord, guessingWord: state.guessingWord}))
  useEffect(() => {
    initializeWord()
  },[])
  return (
    <div className="app">
      <div className='header'>
        <h1>Wordle</h1>
        <div className='horizontal-line'/>
      </div>
      <LetterGrid />
      <Keyboard />
    </div>
  );
}

export default App;
