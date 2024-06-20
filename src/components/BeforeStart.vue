<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  
  const gameStore = game()
  const countDownNumber = ref(4)

  const startGame = () => {
    if (countDownNumber.value > 0) {
      countDownNumber.value--
      setTimeout(() => {
        startGame();
      }, 1000)
    } else {
      gameStore.goToNextState()
      countDownNumber.value = 4
    }
  }
</script>

<template>
  <div class="game-before-start-container">
    <div v-if='countDownNumber > 3' class="start-button" @click='startGame'>
      <div class='begin'>Begin</div>
      <div class='time'>{{ gameStore.options.secondsPerRound }}s</div>
    </div>

    <div v-else class="countdown">
      {{ countDownNumber }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .game-before-start-container {
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
    
    .countdown {
      font-size: 80px;
      font-weight: bold;
    }
  }
</style>
