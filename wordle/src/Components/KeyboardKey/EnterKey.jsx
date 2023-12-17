import React from 'react'
import './KeyboardKey.css'
import { wordStore } from '../wordStore'
import { Words } from '../Words'

const EnterKey = ({size,isLetter}) => {
  const { guessedWords , guessingWord, markWordAsGuessed } = wordStore((state) => ({guessedWords: state.guessedWords,guessingWord: state.guessingWord, markWordAsGuessed:state.markWordAsGuessed}))
  const handleEnterPress = () => {
    let word = ""
    const exists = Words.includes(guessingWord.join('').toLowerCase())

    if(exists) {
      if(guessingWord.length === 5) {
        markWordAsGuessed()
        console.log(guessedWords)
      }
      else {
        console.log("Enter Valid Word")
      }
      console.log("Enter Pressed")
    }
    else {
      console.log("Enter Valid Word")
    }
  }

  return (
    <button className='keyboard-key' key-size={size} key-letter={isLetter} onClick={() => handleEnterPress()}>ENTER</button>
  )
}

export default EnterKey