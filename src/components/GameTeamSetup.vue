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

  const removeTeam = (removeTeam) => {
    gameStore.teams = gameStore.teams.filter(team => team.id !== removeTeam.id)
  }
</script>

<template>
  <div class="game-teams-container">
    <div class="teams">
      <h2 class='head'>Team Setup</h2>
      <div v-for='team in gameStore.teams' :key='team.id' class='team-wrapper' >
        <div class="team-top">
          <i v-if='gameStore.teams.length > 2' @click='removeTeam(team)' class="ri-close-line"></i>
        </div>
        <InputText v-model="team.name" />
      </div>
      <div v-if='!isTeamsMaxed' @click="addTeam" class="team-wrapper add">
        <i class="ri-add-line"></i>
      </div>
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
      font-size: 20px;
      line-height: 20px;
      font-weight: bold;
      box-shadow: none;
      border: 0;
      padding: 5px;
      text-align: center;
      width: 100%;
      margin: 6px auto;
      color: #F04A22;

      &:focus {
        border: 0;
        outline: 0;
      }
    }

    .teams {
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow: scroll;
      background: white;
      color: #F04A22;
      display: grid;
      grid-template-areas: 
        "heading heading";
      grid-template-rows: auto 80px 80px;
      grid-template-columns: 45% 45%;
      justify-content: space-evenly;
      align-content: start;
      gap: 20px;

      .head {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        grid-area: heading;
      }

      .team-wrapper {
        border: 1px solid rgb(215, 215, 215);
        border-radius: 5px;
        position: relative;
        display: flex;
        align-items: center;

        &.add {
          justify-content: center;
          color: rgb(189, 189, 189);
          font-size: 30px;
        }

        .team-top {
          display: flex;
          justify-content: flex-end;
          position: absolute;
          top: 0;
          width: 100%;
          padding: 0 3px;
          color: rgb(189, 189, 189);
        }

      }

      .add-button {
        grid-area: footer;
        justify-self: center;
        align-self: center;
      }
    }

    .bottom {
      padding: 20px 20px 40px;
    }
  }
</style>
