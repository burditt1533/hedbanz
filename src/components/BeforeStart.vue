<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import _ from 'lodash';
  import Button from 'primevue/button';
  import router from '@/router'
  
  const gameStore = game()
  const randomCards = ref([])

  const selectCard = (card) => {
    gameStore.currentCard = card
  }

  const startGame = () => {
    gameStore.currentState = 'gamePlay'
  }

  onMounted(() => {
    randomCards.value = _.sampleSize(gameStore.cards, 3)
  }) 
</script>

<template>
  <div class="top-section">
    <div class="start-button" @click='startGame'>
      <div class='begin'>Begin</div>
      <div class='time'>{{ gameStore.options.secondsPerRound }}s</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .top-section {
    width: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;

    .start-button {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: white;
      color: #EF2424;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .begin {
        font-size: 70px;
        font-weight: bold;
        padding-bottom: 0;
        margin-bottom: 0;
      }

      .time {
        font-weight: bold;
        font-size: 30px;
      }
    }
  }
</style>
