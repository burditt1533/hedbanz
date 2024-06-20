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
    gameStore.currentState = 'gamePlay'
  }

  onMounted(() => {
    randomCards.value = _.sampleSize(gameStore.cards, 3)
  }) 
</script>

<template>
  <div class='header-container'>
    <i class="ri-arrow-left-s-line"></i>
    <!-- <i class="ri-menu-line"></i> -->
    <div class='team-name'>{{ gameStore.currentTeam?.name }}</div>
    <i class="ri-more-2-line"></i>
  </div>
</template>

<style scoped lang="scss">
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 7vh;

    .team-name {
      font-weight: bold;
      font-size: 20px;
    }

    i {
      font-size: 25px;
    }
  }
</style>
