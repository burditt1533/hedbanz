<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import InputText from 'primevue/inputtext';

  const props = defineProps({
    cardData: {
      type: Object,
      required: true
    },
    isAllowEdit: {
      type: Boolean,
      default: false
    }
  })
  
  const gameStore = game()
  
</script>

<template>
  <div :class="['card-container', { paused: gameStore.isPaused }]">
    <div class="guess-action">
      <InputText v-if='isAllowEdit' v-model="cardData.guessAction" />
      <div v-else>{{ cardData.guessAction }}</div>
    </div>
    <div class="forbidden-words">
      <div v-for='(word, index) in cardData.forbiddenWords' :key='word' class="forbidden-word">
        <InputText v-if='isAllowEdit' v-model="cardData.forbiddenWords[index].word" />
        <div v-else>{{ word.word }}</div>
      </div>
    </div>
    <div class="description">
      <InputText v-if='isAllowEdit' v-model="cardData.descriptiveHint" />
      <div v-else>{{ cardData.descriptiveHint }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .card-container {
    max-width: 290px;
    border: 1px solid white;
    border-radius: 10px;
    background: white;
    color: #F04A22;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    div {
      font-weight: inherit
    }

    .p-inputtext {
      background: none;
      box-shadow: none;
      border: 0;
      padding: 0;
      text-align: center;
      width: 100%;
      margin: 6px auto;
      color: #F04A22;
    }

    &.paused {
      color: white;
    }

    .guess-action {
      font-size: 25px;
      font-weight: bold;
      border-bottom: 1px solid rgb(229, 229, 229);
      width: 100%;
      padding: 10px;
      text-align: center;
      text-transform: capitalize;

      .p-inputtext {
        font-size: 25px;
        line-height: 25px;
        font-weight: bold;
        margin: 6px auto;
        color: #F04A22;
        text-transform: capitalize;
      }
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
        text-transform: capitalize;

        .p-inputtext {
          font-size: 23px;
          font-weight: bold;
          line-height: 23px;
          margin: 6px auto;
          color: #F04A22;
          text-transform: capitalize;
        }
      }
    }

    .description {
      padding: 15px;
      font-size: 12px;
      text-align: center;
      width: 100%;

      .p-inputtext {
        font-size: 12px;
        line-height: 12px;
        margin: 6px auto;
        color: #F04A22;
      }
    }
  }
</style>
