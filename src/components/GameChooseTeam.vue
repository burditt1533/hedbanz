<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { game } from '@/stores/game'
import Button from 'primevue/button';

const gameStore = game()

const selectTeam = (teamId) => {
  gameStore.currentRound.teamId = teamId
}

const selectStartingWord = () => {
  gameStore.goToNextState()
}

</script>

<template>
  <div class="choose-team-container">
    <div class="middle">
      <h4 class='select-team'>Select team for next round</h4>

      <div class="teams">
        <div
          v-for='team in gameStore.teams'
          :key='team.id'
          @click='selectTeam(team.id)'
          :class="['team', { selected: gameStore.currentRound.teamId === team.id }]"
        >
          <div class="team-name">{{ team.name }}</div>
          <div class="team-score">{{ team.score }}</div>
          <div class="team-rounds">
            {{ team.completedRounds.length }}/{{ gameStore.options.numberOfRounds }} Rounds
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Button
        @click='selectStartingWord'
        :disabled='!gameStore.currentRound.teamId'
        label="Continue"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .choose-team-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    color: white;
    flex-grow: 1;

    .middle {
      padding: 20px;
      overflow: scroll;
      max-height: 76vh;

      .select-team {
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 30px;
      }

      .teams {
        display: grid;
        grid-template-areas: "team team";
        gap: 10px;

        .team {
          border: 2px solid rgba(255, 255, 255, 0.263);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 7px;

          &.selected {
            border-color: white;
          }

          .team-name {
            font-weight: bold;
            font-size: 25px;
            line-height: 25px;
            margin-bottom: 10px;
          }

          .team-score {
            font-size: 20px;
            line-height: 20px;
            font-weight: bold;
          }

          .team-rounds {
            font-weight: bold;
            font-size: 11px;
            margin-top: 14px;
          }
        }
      }
    }

    .bottom {
      padding: 20px;
      display: flex;
      justify-content: center;
    }
  }
</style>
