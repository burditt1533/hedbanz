<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import Button from 'primevue/button';
  import router from '@/router'
  import InputText from 'primevue/inputtext';
  
  const gameStore = game()

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
    <div class="teams">
      <div v-for='(team, index) in gameStore.teams' :key='team.id' >
        <InputText v-model="team.name" />
        <div v-if='index < gameStore.teams.length - 1' class='vs'>
          vs
        </div>
      </div>
    </div>

    <div class="game-option-section">
      <h4 class="option-name">First To</h4>
      <div class="option-container">
        <i @click="changePointsToWin(-1, 'pointsToWin')" class="ri-arrow-left-s-line"></i>
        <div class="option-value">
          {{ gameStore.options.pointsToWin }}pts
        </div>
        <i @click="changePointsToWin(1, 'pointsToWin')" class="ri-arrow-right-s-line"></i>
      </div>
    </div>

    <div class="game-option-section">
      <h4 class="option-name">Number of Rounds</h4>
      <div class="option-container">
        <i @click="changePointsToWin(-1, 'numberOfRounds')" class="ri-arrow-left-s-line"></i>
        <div class="option-value">
          {{ gameStore.options.numberOfRounds }}
        </div>
        <i @click="changePointsToWin(1, 'numberOfRounds')" class="ri-arrow-right-s-line"></i>
      </div>
    </div>

    <div class="game-option-section">
      <h4 class="option-name">Seconds Per Round</h4>
      <div class="option-container">
        <i @click="changePointsToWin(-1, 'secondsPerRound')" class="ri-arrow-left-s-line"></i>
        <div class="option-value">
          {{ gameStore.options.secondsPerRound }}
        </div>
        <i @click="changePointsToWin(1, 'secondsPerRound')" class="ri-arrow-right-s-line"></i>
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

    .p-inputtext {
      background: none;
      font-size: 40px;
      line-height: 40px;
      font-weight: bold;
      box-shadow: none;
      border: 0;
      padding: 0;
      text-align: center;
      width: 80%;
      margin: 6px auto;
      color: white;
    }

    .teams {
      border-bottom: 1px solid #ca3619;
      width: 100%;
      padding: 20px 0;

      .team-name {
        font-size: 40px;
        line-height: 40px;
        font-weight: bold;
      }

      .vs {
        font-size: 20px;
        line-height: 20px;
      }
    }

    .game-option-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .option-name {
        font-weight: bold;
        font-size: 25px;
        text-align: center;
      }

      .option-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 47%;

        i {
          font-size: 30px;
          line-height: 30px;
        }
        .option-value {
          font-weight: bold;
          font-size: 25px;
        }
      }
    }

    .bottom {
      padding: 20px 20px 40px;
    }
  }
</style>
