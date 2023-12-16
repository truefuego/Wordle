import React from 'react'
import './KeyboardKey.css'

export const KeyboardKey = ({letter,size}) => {
  const handleKeyPress = () => {
    console.log(`${letter} Pressed`)
  }

  return (
    <button className='keyboard-key' key-size={size} onClick={() => handleKeyPress()}>{letter}</button>
  )
}
