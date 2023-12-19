import React from 'react'
import './KeyboardKey.css'
import { wordStore } from '../wordStore'

export const KeyboardKey = ({letter,size}) => {
  const { guessingWord, guessedWordsIndex, letterState, addLetter } = wordStore((state) => ({letterState: state.letterState, guessingWord: state.guessingWord, guessedWordsIndex: state.guessedWordsIndex, addLetter: state.addLetter}))
  const handleKeyPress = () => {
    if(guessingWord.length < 5 && guessedWordsIndex < 6) {
      addLetter(letter)
    }
  }

  return (
    <button className='keyboard-key' data-state={letterState[letter]} key-size={size} onClick={() => handleKeyPress()}>{letter}</button>
  )
}
