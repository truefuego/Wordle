import React from 'react'
import './KeyboardKey.css'
import { wordStore } from '../wordStore'

const BackspaceKey = ({size}) => {
  const { guessingWord, removeLetter } = wordStore((state) => ({guessingWord: state.guessingWord, removeLetter: state.removeLetter}))
  const handleBackspacePress = () => {
    if(guessingWord.length > 0) {
      removeLetter()
    }
  }

  return (
    <div className='keyboard-key' key-size={size} key-letter={`false`} onClick={() => handleBackspacePress()}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M15.683 3a2 2 0 00-2-2h-7.08a2 2 0 00-1.519.698L.241 7.35a1 1 0 000 1.302l4.843 5.65A2 2 0 006.603 15h7.08a2 2 0 002-2V3zM5.829 5.854a.5.5 0 11.707-.708l2.147 2.147 2.146-2.147a.5.5 0 11.707.708L9.39 8l2.146 2.146a.5.5 0 01-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 01-.707-.708L7.976 8 5.829 5.854z" clipRule="evenodd"></path></svg></div>
  )
}

export default BackspaceKey