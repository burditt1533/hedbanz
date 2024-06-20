import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const game = defineStore('game', {
  state: () => ({
    currentCategory: {},
    currentCard: {},
    currentState: 'categories',
    currentRound: {
      teamId: 1,
      secondsRemaining: 60,
      playedCards: [],
    },
    categories: [
      { id: 1, name: 'Sports', timesPlayed: 1, rating: 2, difficulty: 2, icon: 'ri-ping-pong-line', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      { id: 2, name: 'Family', timesPlayed: 4, rating: 5, difficulty: 1, icon: 'ri-team-line', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      { id: 3, name: 'Tech', timesPlayed: 44, rating: 3, difficulty: 5, icon: 'ri-computer-line', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      { id: 4, name: 'Adult', timesPlayed: 16, rating: 4, difficulty: 5, icon: 'ri-goblet-fill', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      { id: 5, name: 'Gamer', timesPlayed: 9, rating: 1, difficulty: 2, icon: 'ri-gamepad-line', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      { id: 6, name: 'Food', timesPlayed: 2, rating: 2, difficulty: 4, icon: 'ri-cake-2-line', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      { id: 7, name: 'Movie', timesPlayed: 2, rating: 5, difficulty: 4, icon: 'ri-movie-line', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      { id: 8, name: 'Frozen', timesPlayed: 2, rating: 2,  difficulty: 4, icon: 'ri-snowflake-line', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    ],
    cards: [
      { id: 1, guessAction: 'Bowling', forbiddenWords: ['Ball', 'Alley', 'Bowl', 'Roll', 'Pin'], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 2, guessAction: 'Swimming In A Lake', forbiddenWords: ['Ball', 'Alley', 'Bowl', 'Roll', 'Pin'], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 3, guessAction: 'Motorboating Boobs', forbiddenWords: ['Ball', 'Alley', 'Bowl', 'Roll', 'Pin'], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: true },
      { id: 4, guessAction: 'Eating Chips', forbiddenWords: ['Bag', 'Lays', 'Doritos', 'Potato', 'Dig'], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 5, guessAction: 'Drinking Bath Water', forbiddenWords: ['Ball', 'Alley', 'Bowl', 'Roll', 'Pin'], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 6, guessAction: 'Climbing Stairs', forbiddenWords: ['Ball', 'Alley', 'Bowl', 'Roll', 'Pin'], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: true },
      { id: 7, guessAction: 'Shooting a basketball', forbiddenWords: ['Hands', 'Throw', 'Launch', 'Curry', 'Sport'], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: true },
    ],
    teams: [
      {
        id: 1,
        name: 'Team A',
        score: 0,
        completedRounds: []
      },
      {
        id: 2,
        name: 'Team B',
        score: 0,
        completedRounds: []
      }
    ],
    options: {
      numberOfRounds: 5,
      pointsToWin: 30,
      secondsPerRound: 60
    },
  }),
  getters: {
    currentTeam() {
      return this.teams.find((team) => this.currentRound.teamId === team.id) || {}
    }
  },
  actions: {
    updateCurrentCategory (category) {
      this.currentCategory = category
    },
    initNextRound () {
      this.currentRound = {
        teamId: 1,
        secondsRemaining: this.options.secondsPerRound,
        playedCards: [],
      }

      this.currentCard = {}
    }
  },
})