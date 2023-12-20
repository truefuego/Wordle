import React from 'react'
import './KeyboardKey.css'
import { wordStore } from '../wordStore'
import { Words } from '../Words'
import useGameStatsStore from '../gameStatsStore'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Enter a valid word!')

const EnterKey = ({size,isLetter}) => {
  const {addStat,addGame} = useGameStatsStore((state) => ({addStat: state.addStat, addGame: state.addGame}))
  const { guessedWords, guessedWordsIndex, guessingWord, markWordAsGuessed, targetWord ,resetGame} = wordStore((state) => ({guessedWordsIndex: state.guessedWordsIndex, gameOver: state.gameOver, resetGame: state.resetGame, targetWord: state.targetWord,guessedWords: state.guessedWords,guessingWord: state.guessingWord, markWordAsGuessed:state.markWordAsGuessed}))
  
  
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
          if(i === 5 && guessedWordsIndex === 5  && tempGuessedWord !== tempTargetWord) {
            addGame()
            resetGame()
            return;
          }
        }
      }
      else {
        notify()
      }
    }
    else {
      notify()
      return (<Toaster />)
    }
  }

  return (
    <button className='keyboard-key' key-size={size} key-letter={isLetter} onClick={() => {
      console.log(guessedWordsIndex)
      if(guessedWordsIndex === 6) {
        addGame()
      }
      handleEnterPress()
    }}>ENTER</button>
  )
}

export default EnterKey