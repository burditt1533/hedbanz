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
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

  const isTeamsMaxed = computed(() => {
    return gameStore.teams.length >= 4
  })

  const addTeam = () => {
    const id = gameStore.teams[gameStore.teams.length -1].id + 1
    if (isTeamsMaxed.value) return
    gameStore.teams.push({
      id: id,
      name: `Team ${ alphabet[id - 1] }`,
      score: 0,
      completedRounds: []
    })
  }
</script>

<template>
  <div class="game-teams-container">
    <div class="teams">
      <div v-for='(team, index) in gameStore.teams' :key='team.id' >
        <InputText v-model="team.name" />
        <div v-if='index < gameStore.teams.length - 1' class='vs'>
          vs
        </div>
      </div>
      <Button
        type="button"
        class='add-button'
        :disabled='isTeamsMaxed'
        icon="ri-add-line"
        rounded
        raised
        @click="addTeam" />
    </div>



    <div class="bottom">
      <Button @click='startGame' label="Next" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .game-teams-container {
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
      color: #F04A22;
    }

    .teams {
      width: 100%;
      padding: 20px 0;
      overflow: scroll;
      background: white;
      color: #F04A22;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;

      .add-button {
        // background: #F04A22;
        // color: white;
        // border: none;
      }

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

    .bottom {
      padding: 20px 20px 40px;
    }
  }
</style>
