import React from 'react'
import './LetterGrid.css'
import { wordStore } from '../wordStore'
import LetterRow from './LetterRow/LetterRow'

const LetterGrid = () => {
  const { guessedWordsIndex, guessedWords, targetWord } = wordStore((state) => ({guessedWordsIndex: state.guessedWordsIndex,guessedWords: state.guessedWords, guessingWord: state.guessingWord, targetWord: state.targetWord}))

  return (
    <div className='letter-grid'>
      <LetterRow word={guessedWords[0].letters} targetWord={targetWord} index={guessedWords[0].index} currentWordIndex={guessedWordsIndex}/>
      <LetterRow word={guessedWords[1].letters} targetWord={targetWord} index={guessedWords[1].index} currentWordIndex={guessedWordsIndex}/>
      <LetterRow word={guessedWords[2].letters} targetWord={targetWord} index={guessedWords[2].index} currentWordIndex={guessedWordsIndex}/>
      <LetterRow word={guessedWords[3].letters} targetWord={targetWord} index={guessedWords[3].index} currentWordIndex={guessedWordsIndex}/>
      <LetterRow word={guessedWords[4].letters} targetWord={targetWord} index={guessedWords[4].index} currentWordIndex={guessedWordsIndex}/>
      <LetterRow word={guessedWords[5].letters} targetWord={targetWord} index={guessedWords[5].index} currentWordIndex={guessedWordsIndex}/>
    </div>
  )
}

export default LetterGrid