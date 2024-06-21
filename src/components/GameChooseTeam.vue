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
            {{team.completedRounds.length}}/{{ gameStore.options.numberOfRounds }} Rounds
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Button @click='selectStartingWord' label="Choose Starting Word" />
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
      border-bottom: 1px solid #cc3737;

      .select-team {
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 30px;
      }

      .teams {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
          gap: 40px;

        .team {
          border: 3px solid rgba(255, 255, 255, 0.263);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 15px 10px;
          width: 100%;
          margin: 0 20px;

          &.selected {
            border-color: white;
          }

          .team-name {
            font-weight: bold;
            font-size: 40px;
            line-height: 40px;
            margin-bottom: 10px;
          }

          .team-score {
            font-size: 40px;
            line-height: 40px;
            font-weight: bold;
          }

          .team-rounds {
            align-self: flex-end;
            font-weight: bold;
            font-size: 11px;
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
