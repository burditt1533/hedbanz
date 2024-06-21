<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import router from '@/router'
import { game } from '@/stores/game'
import GameCategories from '@/components/GameCategories.vue'
import GameSettings from '@/components/GameOptions.vue'
import SelectStartingWord from '@/components/SelectStartingWord.vue'
import GamePlay from '@/components/GamePlay.vue'
import BeforeStart from '@/components/BeforeStart.vue'
import GameHeader from '@/components/GameHeader.vue'
import GameReviewRound from '@/components/GameReviewRound.vue'
import GameChooseTeam from '@/components/GameChooseTeam.vue'

// make categories work
  // cards can have category ids?
// make team screen
// add ability to add more teams
// add rating for cards to hide if explicit mode is checked
// add way to save game, resume game later

// add more cards
// come up with a name
// logo ideas
// color scheme

// make database
// add a way to add/edit cards
// how to delete cards from database

// get biddy environment setup
  // node
  // vue

const gameStore = game()

</script>

<template>
  <main class='game-container'>
    <GameHeader />
    <GameCategories v-if="gameStore.currentState === 'categories'" />
    <GameSettings v-if="gameStore.currentState === 'gameOptions'" />
    <SelectStartingWord v-if="gameStore.currentState === 'startingWord'" />
    <BeforeStart v-if="gameStore.currentState === 'beforeStart'" />
    <GamePlay v-if="gameStore.currentState === 'gamePlay'" />
    <GameReviewRound v-if="gameStore.currentState === 'reviewRound'" />
    <GameChooseTeam v-if="gameStore.currentState === 'chooseTeam'" />
  </main>
</template>

<style scoped lang="scss">
  .game-container {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(45deg, #EF2424, #F04A22);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
