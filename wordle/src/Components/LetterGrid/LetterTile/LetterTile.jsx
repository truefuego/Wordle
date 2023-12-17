import React from 'react'
import './LetterTile.css'

const LetterTile = ({letter,state}) => {
  return (
    <div className='letter-tile' data-state={state}><p>{letter}</p></div>
  )
}

export default LetterTile