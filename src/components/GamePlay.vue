<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
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

  const finishRound = () => {
    gameStore.currentRound.playedCards.push({
      card: gameStore.currentCard,
      status: 'incomplete',
      teamId: gameStore.currentTeam.id
    })
    gameStore.currentState = 'reviewRound'
  }

  const updateTime = () => {
    const time = 1000
    setTimeout(() => {
      if(gameStore.currentRound.secondsRemaining > 0) {
        gameStore.currentRound.secondsRemaining -= time / 1000;
        updateTime()
      } else {
        finishRound()
      }
    }, time)
  }

  const filteredCards = computed(() => {
    return gameStore.cards.filter(card => card.id !== gameStore.currentCard.id)
  })

  onMounted(() => {
    randomCards.value = _.sampleSize(filteredCards.value, gameStore.cards.length)
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
      @click="gameStore.currentRound.secondsRemaining = 0"
      :valueTemplate="(value) => value.toFixed(0)"
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
          <div class="card-container">
            <div class="guess-action">{{ slotProps.data.guessAction }}</div>
            <div class="forbidden-words">
              <div v-for='word in slotProps.data.forbiddenWords' :key='word'  class="forbidden-word">
                {{ word }}
              </div>
            </div>
            <div class="description">
              {{ slotProps.data.descriptiveHint }}
            </div>
            
          </div>
        </template>
      </Carousel>
    </div>

    <div class="bottom-buttons">
      <Button @click='skipCard' label='Skip -1' />
      <Button @click='goToNextCard' label='Next +1' />
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
  }
</style>

<style scoped lang="scss">
  .p-carousel {
    pointer-events: none;
  }

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

      .card-container {
        max-width: 90%;
        border: 1px solid white;
        border-radius: 10px;
        background: white;
        color: #F04A22;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;

        .guess-action {
          font-size: 25px;
          font-weight: bold;
          border-bottom: 1px solid rgb(229, 229, 229);
          width: 100%;
          padding: 10px;
          text-align: center;
        }

        .forbidden-words {
          padding: 20px;
          font-size: 23px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;

          .forbidden-word {
            font-weight: bold;
          }
        }

        .description {
          padding: 15px;
          font-size: 12px;
          text-align: center;
        }
      }
    }

    .bottom-buttons {
      display: flex;
      width: 80%;
      justify-content: space-around;
      margin-top: 40px;
    }
  }
</style>
