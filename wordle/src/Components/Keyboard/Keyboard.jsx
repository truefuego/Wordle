import React from 'react'
import './Keyboard.css'
import { KeyboardKey } from '../KeyboardKey/KeyboardKey'
import BackspaceKey from '../KeyboardKey/BackspaceKey'
import EnterKey from '../KeyboardKey/EnterKey'

const topLetters = ["Q","W","E","R","T","Y","U","I","O","P"]
const middleLetters = ["A","S","D","F","G","H","J","K","L"]
const bottomLetters = ["Z","X","C","V","B","N","M"]



const Keyboard = () => {
  return (
    <div className='keyboard'>
      <div className='keyboard-row'>
        {topLetters.map((item) => <KeyboardKey key={item} letter={item} size={"small"}/>)}
      </div>
      <div className='keyboard-row'>
        {middleLetters.map((item) => <KeyboardKey key={item} letter={item} size={"small"}/>)}
      </div>
      <div className='keyboard-row'>
        <EnterKey size={"large"} letter={"ENTER"}/>
        {bottomLetters.map((item) => <KeyboardKey key={item} letter={item} size={"small"}/>)}
        <BackspaceKey size={"large"}/>
      </div>
    </div>
  )
}

export default Keyboard