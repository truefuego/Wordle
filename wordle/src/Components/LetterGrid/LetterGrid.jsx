import React, { useState } from 'react'
import './LetterGrid.css'
import LetterTile from './LetterTile/LetterTile'
import { wordStore } from '../wordStore'

const LetterGrid = () => {
  const { guessedWordsIndex, guessedWords } = wordStore((state) => ({guessedWordsIndex: state.guessedWordsIndex,guessedWords: state.guessedWords}))

  return (
    <div className='letter-grid'>
      {guessedWords.map((item) => (<div className='letter-grid-row' index={item.index}>{item.letters.map((letter) => (<LetterTile state={"pending"} letter={letter}/>))}</div>))}
      {/**<div className='letter-grid-row'>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
      </div>
      <div className='letter-grid-row'>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
      </div>
      <div className='letter-grid-row'>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
      </div>
      <div className='letter-grid-row'>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
      </div>
      <div className='letter-grid-row'>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
      </div>
      <div className='letter-grid-row'>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
        <LetterTile state={"pending"}/>
      </div> */}
    </div>
  )
}

export default LetterGrid