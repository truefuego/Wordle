import { create } from 'zustand'
import { Words } from './Words'

const remLetter = (s) => {
    return s.slice(0, -1);
}

export const wordStore = create((set) => {
    return {
        targetWord: "",

        initializeWord: () => set((state) => ({
            targetWord: [...Words[Math.floor(Math.random()*1000000) % Words.length].toUpperCase()]
        })),

        guessingWord: [],
        guessingWordIndex: 0,
        guessedWords: [
            { 
                index: 0,
                letters: ['','','','','']
            },
            { 
                index: 1,
                letters: ['','','','','']
            },
            { 
                index: 2,
                letters: ['','','','','']
            },
            { 
                index: 3,
                letters: ['','','','','']
            },
            { 
                index: 4,
                letters: ['','','','','']
            },
            { 
                index: 5,
                letters: ['','','','','']
            }
        ],
        guessedWordsIndex: 0,

        addLetter: (ch) => set((state) => {
            const newGuessedWords = [...state.guessedWords]
            newGuessedWords[state.guessedWordsIndex].letters[state.guessingWordIndex] = ch
            return {
                guessingWord: [...state.guessingWord,ch],
                guessedWords: newGuessedWords,
                guessingWordIndex: state.guessingWordIndex+1
            }
        }),
        removeLetter: () => set((state) => {
            const newGuessedWords = [...state.guessedWords]
            newGuessedWords[state.guessedWordsIndex].letters[state.guessingWordIndex-1] = ''
            return {
                guessedWords: newGuessedWords,
                guessingWord: remLetter(state.guessingWord),
                guessingWordIndex: state.guessingWordIndex-1
            }
        }),

        markWordAsGuessed: () => set((state) => {
            // const newGuessedWords = [...state.guessedWords];
            // newGuessedWords[state.guessedWordsIndex].letters = state.guessingWord;
            return {
                guessingWord: [],
                guessingWordIndex: 0,
                guessedWordsIndex: state.guessedWordsIndex + 1
            }
        })
    }
})
