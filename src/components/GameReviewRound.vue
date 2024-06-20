<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import router from '@/router'
import { game } from '@/stores/game'
import _ from 'lodash';
import Button from 'primevue/button';

const gameStore = game()

const groupedCards = computed(() => {
  return _.groupBy(gameStore.currentRound.playedCards, (card) => card.status) || {};
})

const netScore = computed(() => {
  const completedAmount = groupedCards.value.complete?.length || 0
  const skippedAmount = groupedCards.value.skipped?.length || 0
  return completedAmount - skippedAmount
})

const plusMinus = computed(() => {
  return netScore.value > 0 ? '+' : ''
})

const goToChooseTeam = () => {
  gameStore.currentTeam.score += netScore.value
  gameStore.currentTeam.completedRounds.push(gameStore.currentRound)

  gameStore.initNextRound()
  gameStore.currentState = 'chooseTeam'
}

</script>

<template>
  <div class="review-round-container">
    <div class="middle">
      <div class="net-amount">{{ plusMinus }}{{ netScore }}</div>
      <div class="cards-container">
        <div class="card-list">
          <h4 class='list-title'>Completed</h4>
          <div v-for='group in groupedCards.complete' :key='group.card?.id' class="card">
            {{ group.card?.guessAction }} +1
          </div>
        </div>
        <div class="card-list">
          <h4 class='list-title'>Skipped</h4>
          <div v-for='group in groupedCards.skipped' :key='group.card?.id' class="card">
            {{ group.card?.guessAction }} -1
          </div>
        </div>
        <div class="card-list incomplete">
          <h4 class='list-title'>Incomplete</h4>
          <div v-for='group in groupedCards.incomplete' :key='group.card?.id' class="card">
            {{ group.card?.guessAction }}
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Button @click='goToChooseTeam' label="Continue" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .review-round-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    color: white;
    flex-grow: 1;

    .net-amount {
      font-size: 75px;
      font-weight: bold;
      margin-left: 50px;
    }

    .middle {

      .cards-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
  
        .card-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 300px;
          overflow-y: scroll;
          font-weight: bold;
          // padding: 10px;
          width: 100%;

          &.incomplete {
            height: auto;
          }

          .card {
            padding: 0 20px;
          }
  
          .list-title {
            font-weight: bold;
            font-size: 30px;
            padding: 20px 20px 0;
            border-top: 1px solid #c42612;
          }
        }
      }
    }

    .bottom {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
    }

  }

</style>
