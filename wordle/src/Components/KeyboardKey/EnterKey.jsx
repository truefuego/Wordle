import React from 'react'
import './KeyboardKey.css'

const EnterKey = ({size,isLetter}) => {
  const handleEnterPress = () => {
    console.log("Enter Pressed")
  }

  return (
    <button className='keyboard-key' key-size={size} key-letter={isLetter} onClick={() => handleEnterPress()}>ENTER</button>
  )
}

export default EnterKey