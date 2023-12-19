import React, { useState } from 'react'
import './LetterRow.css'
import LetterTile from '../LetterTile/LetterTile'
import { useEffect } from 'react'
import { wordStore } from '../../wordStore'
const LetterRow = ({word,targetWord,index,currentWordIndex}) => {
  const [tileState,setTileState] = useState(["pending","pending","pending","pending","pending"])
  const {changeLetterState} = wordStore((state) => ({changeLetterState: state.changeLetterState}))

  const findWordState = () => {
    let tempTileState = [...tileState]
    let tempMap = []
    if(index === currentWordIndex) {
      setTileState(["current-pending","current-pending","current-pending","current-pending","current-pending"])
      return;
    }
    for(let i = 0 ; i < 5 ; i++) {
      if(word[i] === targetWord[i]) {
        tempTileState[i] = "correct";
      }
      else {
        tempMap.push(targetWord[i]);
      }
    }
    for(let i = 0 ; i < 5 ; i++) {
      if(tempTileState[i] !== "correct") {
        if(tempMap.includes(word[i])) {
          tempTileState[i] = "partially"
        }
        else {
          if(index < currentWordIndex)
            tempTileState[i] = "incorrect"
        }
      }
    }
    setTileState(tempTileState)
  }

  const updateFoundLetters = () => {
    for(let i = 0 ; i < 5 ; i++) {
      if(targetWord.includes(word[i])) {
        changeLetterState(word[i],"partially")
      }
      else {
        changeLetterState(word[i],"incorrect")
      }
      if(targetWord[i] === word[i]) {
        changeLetterState(word[i],"correct")
      }
    }
  }

  useEffect(() => {
    findWordState()
    updateFoundLetters()
  },[currentWordIndex])

  return (
    <div className='letter-grid-row'>
      <LetterTile state={tileState[0]} letter={word[0]}/>
      <LetterTile state={tileState[1]} letter={word[1]}/>
      <LetterTile state={tileState[2]} letter={word[2]}/>
      <LetterTile state={tileState[3]} letter={word[3]}/>
      <LetterTile state={tileState[4]} letter={word[4]}/>
    </div>
  )
}

export default LetterRow