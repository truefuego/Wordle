import { useEffect, useState } from 'react';
import './App.css';
import Keyboard from './Components/Keyboard/Keyboard';
import LetterGrid from './Components/LetterGrid/LetterGrid';
import { wordStore } from './Components/wordStore';
import useGameStatsStore from './Components/gameStatsStore';
import { Words } from './Components/Words';
import toast, { Toaster } from 'react-hot-toast';
import CORRECT_IMAGE from './Assets/correct.png'
import INCORRECT_IMAGE from './Assets/incorrect.png'
import PARTIALLY_IMAGE from './Assets/partially.png'

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

  const [showHowToPlay,setShowHowToPlay] = useState(false)
  const [showStats,setShowStats] = useState(false)

  const handleShowHowToPlay = () => {
    setShowHowToPlay(!showHowToPlay)
  }

  const handleShowStats = () => {
    setShowStats(!showStats)
  }

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
          if(guessedWordsIndex === 5) {
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
          <div onClick={() => handleShowHowToPlay()} className='header-icons'><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm4.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clipRule="evenodd"></path></svg></div>
          <h1>Wordle</h1>
          <div onClick={() => handleShowStats()} className='header-icons'><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M184 448h48c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v368c0 4.4 3.6 8 8 8zM88 448h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8H88c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zM280.1 448h47.8c4.5 0 8.1-3.6 8.1-8.1V232.1c0-4.5-3.6-8.1-8.1-8.1h-47.8c-4.5 0-8.1 3.6-8.1 8.1v207.8c0 4.5 3.6 8.1 8.1 8.1zM368 136.1v303.8c0 4.5 3.6 8.1 8.1 8.1h47.8c4.5 0 8.1-3.6 8.1-8.1V136.1c0-4.5-3.6-8.1-8.1-8.1h-47.8c-4.5 0-8.1 3.6-8.1 8.1z"></path></svg></div>
        </div>
        <Toaster />
        <LetterGrid />
        <Keyboard />
      </div>
      {showHowToPlay && (
        <div className='how-to-play'>
          <p className='popup-tag'>How To Play</p>
          <p className='total-games-dist'>Guess the Wordle in 6 tries.</p>
          <p className='total-games-dist' style={{textAlign: 'center',marginLeft: '30px',marginRight: '30px'}}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path></svg> Each guess must be a valid 5-letter word.</p>
          <p className='total-games' style={{textAlign: 'center',marginLeft: '30px',marginRight: '30px'}}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path></svg> The color of the tiles will change to show how close your guess was to the word.</p>
          <p className='popup-tag'>Examples</p>
          <img className='pop-up-image' src={CORRECT_IMAGE} alt='correct'/>
          <p className='pop-up-image-text'><b style={{color: "#538d4e"}}>D</b> is in the word and in the correct spot.</p>
          <img className='pop-up-image' src={PARTIALLY_IMAGE} alt='partially'/>
          <p className='pop-up-image-text'><b style={{color: "#b59f3b"}}>E</b> is in the word but in the wrong spot.</p>
          <img className='pop-up-image' src={INCORRECT_IMAGE} alt='incorrect'/>
          <p className='pop-up-image-text'><b>V</b> is not in the word in any spot.</p>
          <button onClick={() => handleShowHowToPlay()} className='back-button'>BACK</button>
        </div>
      )}
      {showStats && (<div className='popup-container'>
        <p className='popup-tag'>Your Statistics!</p>
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
        <button onClick={() => handleShowStats()} className='back-button'>BACK</button>
      </div>)}
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
