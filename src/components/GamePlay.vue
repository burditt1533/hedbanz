<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import GameCard from '@/components/GameCard.vue'
  import Button from 'primevue/button';
  import Carousel from 'primevue/carousel';
  import Knob from 'primevue/knob';
  import _ from 'lodash';
  
  const gameStore = game()
  const randomCards = ref([])
  const cardCarosel = ref(null)
  const randomCardIndex = ref(0)

  const goToNextCard = (e) => {
    gameStore.currentRound.playedCards.push({
      card: gameStore.currentCard,
      status: 'complete',
      teamId: gameStore.currentTeam.id
    })
    randomCardIndex.value++
    cardCarosel.value.navForward(e)
    gameStore.currentCard = randomCards.value[randomCardIndex.value]
  }

  const skipCard = (e) => {
    gameStore.currentRound.playedCards.push({
      card: gameStore.currentCard,
      status: 'skipped',
      teamId: gameStore.currentTeam.id
    })
    cardCarosel.value.navForward(e)
    randomCardIndex.value++
    gameStore.currentCard = randomCards.value[randomCardIndex.value]
  }

  const togglePausedState = () => {
    gameStore.isPaused = !gameStore.isPaused
    if (!gameStore.isPaused) updateTime()
  }

  const updateTime = () => {
    const time = 1000
    setTimeout(() => {
      if (gameStore.isPaused) return

      if (gameStore.currentRound.secondsRemaining > 0) {
        gameStore.currentRound.secondsRemaining -= time / 1000;
        updateTime()
      } else {
        gameStore.finishRound()
      }
    }, time)
  }

  const knobText = (value) => {
    return gameStore.isPaused ? '▶' : value.toFixed(0)
  }

  const filteredCards = computed(() => {
    return gameStore.filteredCards.filter(card => card.id !== gameStore.currentCard.id)
  })

  onMounted(() => {
    randomCards.value = _.sampleSize(filteredCards.value, gameStore.filteredCards.length)
    randomCards.value.unshift(gameStore.currentCard)
    updateTime()
  })
</script>

<template>
  <div class="gameplay-container">
    <Knob
      v-model="gameStore.currentRound.secondsRemaining"
      readonly
      :max='gameStore.options.secondsPerRound'
      :size='100'
      @click="togglePausedState"
      :valueTemplate="knobText"
    />
    <div class="cards-container">
      <Carousel
        ref='cardCarosel'
        :value="randomCards"
        :numVisible="1"
        :numScroll="1"
        :showNavigators='false'
        :showIndicators='false'
      >
        <template #item="slotProps">
          <GameCard :cardData='slotProps.data' />
        </template>
      </Carousel>
    </div>

    <div class="bottom-buttons">
      <Button @click='skipCard' :disabled='gameStore.isPaused' label='Skip -1' />
      <Button @click='togglePausedState' :icon="gameStore.isPaused ? 'ri-play-line': 'ri-pause-line'" />
      <Button @click='goToNextCard' :disabled='gameStore.isPaused' label='Next +1' />
    </div>
  </div>
</template>

<style lang="scss">
  .gameplay-container {
    .p-knob-value {
      stroke: white;
    }
    .p-knob-range {
      stroke: transparent;
    }
    .p-knob-text {
      fill: white;
      font-weight: bold;
      font-size: 18px;
    }
    .p-carousel {
      pointer-events: none;
    }
  }
</style>

<style scoped lang="scss">

  .gameplay-container {
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;

    .cards-container {
      width: 100%;
    }

    .bottom-buttons {
      display: flex;
      width: 80%;
      justify-content: space-around;
      margin-top: 40px;
    }
  }
</style>
