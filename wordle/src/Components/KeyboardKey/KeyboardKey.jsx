import React from 'react'
import './KeyboardKey.css'
import { wordStore } from '../wordStore'

export const KeyboardKey = ({letter,size}) => {
  const { guessingWord, guessedWordsIndex, addLetter } = wordStore((state) => ({guessingWord: state.guessingWord, guessedWordsIndex: state.guessedWordsIndex, addLetter: state.addLetter}))
  const handleKeyPress = () => {
    if(guessingWord.length < 5 && guessedWordsIndex < 6) {
      addLetter(letter)
      console.log(`${letter} Pressed!`)
    }
  }

  return (
    <button className='keyboard-key' key-size={size} onClick={() => handleKeyPress()}>{letter}</button>
  )
}
