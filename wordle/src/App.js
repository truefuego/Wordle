import { useEffect } from 'react';
import './App.css';
import Keyboard from './Components/Keyboard/Keyboard';
import LetterGrid from './Components/LetterGrid/LetterGrid';
import { wordStore } from './Components/wordStore';
import useGameStatsStore from './Components/gameStatsStore';
import { Words } from './Components/Words';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Enter a valid word!')

function App() {
  const {
    targetWord, 
    guessedWords, 
    guessingWord, 
    initializeWord,
    guessedWordsIndex,
    gameOver,
    restartGame,
    addLetter,
    removeLetter,
    markWordAsGuessed,
    resetGame,
  } = wordStore((state) => ({
    gameOver: state.gameOver, 
    restartGame: state.restartGame, 
    guessedWords: state.guessedWords, 
    targetWord: state.targetWord, 
    initializeWord: state.initializeWord, 
    guessingWord: state.guessingWord,
    guessedWordsIndex: state.guessedWordsIndex,
    addLetter: state.addLetter,
    removeLetter: state.removeLetter,
    markWordAsGuessed: state.markWordAsGuessed,
    resetGame: state.resetGame
  }))

  const validLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

  const {totalGames, gameStats, addStat, addGame} = useGameStatsStore((state) => ({addGame: state.addGame, totalGames: state.totalGames, addStat: state.addStat, gameStats: state.gameStats}))

  useEffect(() => {
    restartGame()
    initializeWord()
  },[restartGame,initializeWord])

  const handleEnterPress = () => {
    const exists = Words.includes(guessingWord.join('').toLowerCase())

    if(exists) {
      if(guessingWord.length === 5) {
        markWordAsGuessed()
        for(let i = 0 ; i < 6 ; i++) {
          const tempGuessedWord = [...guessedWords[i].letters]
          const tempTargetWord = [...targetWord]
          let found = true;
          for(let j = 0 ; j < 5 ; j++) {
            if(tempGuessedWord[j] !== tempTargetWord[j]) {
              found = false;
            }
          }
          if(found) {
            addStat(guessedWordsIndex)
            addGame()
            resetGame()
            break;
          }
          if(guessedWordsIndex === 6) {
            addGame()
            resetGame()
            break;
          }
        }
      }
      else {
        notify()
      }
    }
    else {
      notify()
    }
  }

  const handleBackspacePress = () => {
    if(guessingWord.length > 0) {
      removeLetter()
    }
  }

  const handleKeyDown = (event) => {
    if(event.repeat) {
      return;
    }
    if(event.key === 'Enter') {
      if(gameOver || guessedWordsIndex === 6) {
        window.location.reload(false)
      }
      else 
        handleEnterPress()
    }
    else if(event.key === 'Backspace') {
      handleBackspacePress()
    }
    else if(validLetters.includes(event.key.toUpperCase())) {
      if(guessingWord.length >= 0 && guessedWordsIndex >= 0 && guessingWord.length < 5 && guessedWordsIndex < 6) {
        addLetter(event.key.toUpperCase())
      }
    }
  }

  return (
    <div className='container'>
      <div className="app" autoFocus={true} tabIndex={0} onKeyDown={handleKeyDown}>
        <div className='header'>
          <h1>Wordle</h1>
          <div className='horizontal-line'/>
        </div>
        <Toaster />
        <LetterGrid />
        <Keyboard />
      </div>
      {(gameOver || guessedWordsIndex === 6) && 
      (<div className='popup-container'>
        {guessedWordsIndex === 6 ? (<p className='popup-tag'>Keep trying! {targetWord}</p>) : (<p className='popup-tag'>Well done!</p>)}
        <p className='total-games'>Games played: {totalGames}</p>
        <p className='total-games-dist'>Guess Distribution</p>
        <div className='game-stats-container'>
          <div className='game-stats-bar-container'>
            <div className='game-bar-index'>1</div>
            <div className='game-stats-bar' style={{height: `${Math.ceil(gameStats[0] * 100 / totalGames)}%`}}/>
          </div>
          <div className='game-stats-bar-container'>
            <div className='game-bar-index'>2</div>
            <div className='game-stats-bar' style={{height: `${Math.ceil(gameStats[1] * 100 / totalGames)}%`}}/>
          </div>
          <div className='game-stats-bar-container'>
            <div className='game-bar-index'>3</div>
            <div className='game-stats-bar' style={{height: `${Math.ceil(gameStats[2] * 100 / totalGames)}%`}}/>
          </div>
          <div className='game-stats-bar-container'>
            <div className='game-bar-index'>4</div>
            <div className='game-stats-bar' style={{height: `${Math.ceil(gameStats[3] * 100 / totalGames)}%`}}/>
          </div>
          <div className='game-stats-bar-container'>
            <div className='game-bar-index'>5</div>
            <div className='game-stats-bar' style={{height: `${Math.ceil(gameStats[4] * 100 / totalGames)}%`}}/>
          </div>
          <div className='game-stats-bar-container'>
            <div className='game-bar-index'>6</div>
            <div className='game-stats-bar' style={{height: `${Math.ceil(gameStats[5] * 100 / totalGames)}%`}}/>
          </div>
        </div>
        <button onClick={() => window.location.reload(false)} className='reload-button'>RESET</button>
      </div>)}
    </div>
  );
}

export default App;
