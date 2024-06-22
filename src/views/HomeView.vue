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
import GameTeamSetup from '@/components/GameTeamSetup.vue'
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090');

// add way to save game, resume game later
// better select team ui since more teams added
// better team setup ui since more teams added

// add more cards
// come up with a name
// logo ideas
// color scheme

// make database
// add a way to add/edit cards
// only show cards with active: true
// make categories work
  // cards can have category ids?

// get biddy environment setup
  // node
  // vue

const gameStore = game()

onMounted(async () => {
  // list and filter "example" collection records
// const result = await pb.collection('example').getList(1, 20, {
//     filter: 'status = true && created > "2022-08-01 10:00:00"'
// });

// authenticate as auth collection record
// const userData = await pb.collection('users').authWithPassword('phileasy2002@gmail.com', 'Sluget2880!');

// or as super-admin
// const adminData = await pb.admins.authWithPassword('phileasy2002@gmail.com', 'Sluget2880!');

// fetch a paginated records list
const cards = await pb.collection('cards').getFullList({ sort: '-created' });
gameStore.cards = cards

console.log(cards)

})

</script>

<template>
  <main class='game-container'>
    <GameHeader />
    <GameCategories v-if="gameStore.currentState === 'categories'" />
    <GameTeamSetup v-if="gameStore.currentState === 'gameTeamSetup'" />
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
