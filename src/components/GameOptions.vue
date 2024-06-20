<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import Button from 'primevue/button';
  import router from '@/router'
  import Inplace from 'primevue/inplace';
  import InputText from 'primevue/inputtext';
  
  const gameStore = game()

  const startGame = () => {
    gameStore.currentRound.teamId = 1
    gameStore.initNextRound()
    gameStore.currentState = 'chooseTeam'
  }

  const closeCallback = () => {

  }

  const changePointsToWin = (amount, property) => {
    gameStore.options[property] += amount
  } 
</script>

<template>
  <div class="top-section">
    <div class="teams">
      <div v-for='(team, index) in gameStore.teams' :key='team.id' >
        <Inplace>
          <template #display>
            <h1 class='team-name'>{{ team.name }}</h1>
          </template>
          <template #content="{ closeCallback }">
            <span class="inline-flex items-center gap-2">
              <InputText v-model="team.name" autofocus />
              <Button icon="ri-check-line" text severity="success" @click="closeCallback" />
            </span>
          </template>
        </Inplace>
        <div v-if='index < gameStore.teams.length - 1' class='vs'>
          vs
        </div>
      </div>
    </div>

    <div class="game-option-container">
      <h4 class="option-name">First To</h4>
      <div class="option-container">
        <i @click="changePointsToWin(-1, 'pointsToWin')" class="ri-arrow-left-s-line"></i>
        <div class="option-value">
          {{ gameStore.options.pointsToWin }}pts
        </div>
        <i @click="changePointsToWin(1, 'pointsToWin')" class="ri-arrow-right-s-line"></i>
      </div>
    </div>

    <div class="game-option-container">
      <h4 class="option-name">Number of Rounds</h4>
      <div class="option-container">
        <i @click="changePointsToWin(-1, 'numberOfRounds')" class="ri-arrow-left-s-line"></i>
        <div class="option-value">
          {{ gameStore.options.numberOfRounds }}pts
        </div>
        <i @click="changePointsToWin(1, 'numberOfRounds')" class="ri-arrow-right-s-line"></i>
      </div>
    </div>

    <div class="game-option-container">
      <h4 class="option-name">Seconds Per Round</h4>
      <div class="option-container">
        <i @click="changePointsToWin(-1, 'secondsPerRound')" class="ri-arrow-left-s-line"></i>
        <div class="option-value">
          {{ gameStore.options.secondsPerRound }}pts
        </div>
        <i @click="changePointsToWin(1, 'secondsPerRound')" class="ri-arrow-right-s-line"></i>
      </div>
    </div>

    <Button @click='startGame' label="Next" />
  </div>
</template>

<style scoped lang="scss">
  .top-section {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    text-align: center;

    .teams {
      .team-name {
        font-size: 50px;
        font-weight: bold;
      }

      .vs {
        font-size: 30px;
      }
    }

    .game-option-container {
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
        width: 55%;

        i {
          font-size: 40px;
        }
        .option-value {
          font-weight: bold;
          font-size: 35px;
        }
      }
    }
  }
</style>
