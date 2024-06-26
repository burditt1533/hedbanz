<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import Button from 'primevue/button';
  import router from '@/router'
  import InputText from 'primevue/inputtext';
  import InputSwitch from 'primevue/inputswitch';
  
  const gameStore = game()

  const gameOptions = ref([
    { name: 'First To', option: 'pointsToWin', units: 'pts' },
    { name: 'Number of Rounds', option: 'numberOfRounds', units: 'pts '},
    { name: 'Seconds Per Round', option: 'secondsPerRound', units: '' },
  ])

  const startGame = () => {
    gameStore.currentRound.teamId = 1
    gameStore.initNextRound()
    gameStore.goToNextState()
  }

  const closeCallback = () => {

  }

  const changePointsToWin = (amount, property) => {
    gameStore.options[property] += amount
  } 
</script>

<template>
  <div class="game-options-container">
    <h4 class="option-heading">Game Options</h4>

    <div class="options-wrapper">

      <div v-for='option in gameOptions' :key='option' class="game-option-section">
        <h4 class="option-name">{{ option.name }}</h4>
        <div class="option-container">
          <i @click="changePointsToWin(-1, option.option)" class="ri-arrow-left-s-line"></i>
          <div class="option-value">
            {{ gameStore.options[option.option] }}{{ option.units }}
          </div>
          <i @click="changePointsToWin(1, option.option)" class="ri-arrow-right-s-line"></i>
        </div>
      </div>

      <div class="game-option-section">
        <h4 class="option-name">Show Explicit Cards</h4>
        <div class="option-container">
          <div class="option-value">
            <InputSwitch v-model="gameStore.isShowExplicitCards" />
          </div>
        </div>
      </div>

    </div>

    <div class="bottom">
      <Button @click='startGame' label="Next" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .game-options-container {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 10px;

    .option-heading {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .options-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
    }

    .game-option-section {
      width: 100%;
      display: flex;
      background: #d1d1d124;
      padding: 15px;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      min-height: 75px;
      color: white;
      border: 1px solid #ce2d1c;

      .option-name {
        font-weight: bold;
        font-size: 14px;
        text-align: center;
      }

      .option-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 35%;

        i {
          font-size: 25px;
          line-height: 25px;
        }

        .option-value {
          font-weight: bold;
          font-size: 18px;
          width: 100%;
        }
      }
    }

    .bottom {
      padding: 20px 20px 40px;
    }
  }
</style>
