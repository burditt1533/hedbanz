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
    gameStore.goToNextState()
  }

  onMounted(() => {
    randomCards.value = _.sampleSize(gameStore.filteredCards, 3)
  }) 
</script>

<template>
  <div class="starting-word-container">
    <h1 class='starting-option'>Select Starting Option</h1>

    <div class="card-options">
      <div
        v-for='card in randomCards'
        :key='card.id'
        @click='selectCard(card)'
        :class="['option', { selected: card.id === gameStore.currentCard?.id }]"
      >
        {{ card.guess_action }}
      </div>
    </div>

    <Button @click='startGame' :disabled='!gameStore.currentCard.id' label='Start Round' />
  </div>
</template>

<style scoped lang="scss">
  .starting-word-container {
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;

    .starting-option {
      font-weight: bold;
      font-size: 25px;
    }

    .card-options {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 30px;
      width: 100%;

      .option {
        font-size: 23px;
        font-weight: bold;
        padding: 15px;
        text-align: center;
        border: 3px solid rgb(255 255 255 / 27%);
        border-radius: 8px;
        width: 90%;

        &.selected {
          background: white;
          border-color: white;
          color: #EF2424;
        }
      }
    }
  }
</style>
