import { create } from "zustand";
import {persist, devtools} from 'zustand/middleware'

const gameStatsStore = (set) => ({
    totalGames: 0,

    gameStats: [0,0,0,0,0,0],

    addStat: (value) => set((state) => {
        let tempStats = [...state.gameStats]
        tempStats[value]++;
        return {
            gameStats: tempStats
        }
    }),

    addGame: () => set((state) => {
        return {totalGames: state.totalGames + 1} 
    })
})

const useGameStatsStore = create(
    devtools(
        persist(gameStatsStore,{name: "wordle"})
    )
)

export default useGameStatsStore