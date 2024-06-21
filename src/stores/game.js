import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const game = defineStore('game', {
  state: () => ({
    gameStates: ['categories', 'gameTeamSetup', 'gameOptions', 'chooseTeam', 'startingWord', 'beforeStart', 'gamePlay', 'reviewRound'],
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
      { id: 1, guessAction: 'Bowling', forbiddenWords: [{word: 'Ball'}, {word: 'Alley'}, {word: 'Bowl'} ,{word: 'Roll'}, {word: 'Pin'}], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 2, guessAction: 'Swimming In A Lake', forbiddenWords: [{word: 'Stroke'}, {word: 'Water'}, {word: 'Bowl'} ,{word: 'Roll'}, {word: 'Pin'}], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 3, guessAction: 'Motorboating Boobs', forbiddenWords: [{word: 'Ball'}, {word: 'Alley'}, {word: 'Bowl'} ,{word: 'Roll'}, {word: 'Pin'}], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: true },
      { id: 4, guessAction: 'Eating Chips', forbiddenWords: [{word: 'Bag'}, {word: 'Lays'}, {word: 'Doritos'} ,{word: 'Potato'}, {word: 'Dig'}], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 5, guessAction: 'Drinking Bath Water', forbiddenWords: [{word: 'Ball'}, {word: 'Alley'}, {word: 'Bowl'} ,{word: 'Roll'}, {word: 'Pin'}], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 6, guessAction: 'Climbing Stairs', forbiddenWords: [{word: 'Ball'}, {word: 'Alley'}, {word: 'Bowl'} ,{word: 'Roll'}, {word: 'Pin'}], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
      { id: 7, guessAction: 'Shooting a basketball', forbiddenWords: [{word: 'Hands'}, {word: 'Throw'}, {word: 'Launch'} ,{word: 'Curry'}, {word: 'Sport'}], descriptiveHint: 'Bowling a bowling ball down a lane', timesPlayed: 0, isExplicit: false },
    ],
    currentCategory: {},
    currentCard: {},
    isPaused: false,
    isShowExplicitCards: false,
    currentStateIndex: 0,
    currentRound: {
      teamId: 1,
      secondsRemaining: 60,
      playedCards: [],
    },
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
    currentTeam () {
      return this.teams.find((team) => this.currentRound.teamId === team.id) || {}
    },
    currentState () {
      return this.gameStates[this.currentStateIndex]
    },
    filteredCards () {
      return this.cards.filter((card) => {
        const isPassedExplicitCheck = !card.isExplicit || this.isShowExplicitCards
        if (isPassedExplicitCheck) {
          return card
        }
      })
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

      this.isPaused = false
      this.currentCard = {}
    },
    goToNextState () {
      if (this.currentState === 'reviewRound') {
        // go to choose team
        this.currentStateIndex = 3
      } else {
        this.currentStateIndex++;
      }
    },
    goToPrevState () {
      this.currentStateIndex--;
    },
    finishRound () {
      this.currentRound.playedCards.push({
        card: this.currentCard,
        status: 'incomplete',
        teamId: this.currentTeam.id
      })
      this.isPaused = true
      this.goToNextState()
    }
  },
})