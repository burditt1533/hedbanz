<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { game } from '@/stores/game'
  import _ from 'lodash';
  import Button from 'primevue/button';
  import Menu from 'primevue/menu';
  import router from '@/router'
  
  const gameStore = game()
  const randomCards = ref([])

  const selectCard = (card) => {
    gameStore.currentCard = card
  }

  const startGame = () => {
    gameStore.goToNextState()
  }

  const menu = ref();
  const items = ref([
    {
      label: 'Menu',
      items: [
        {
          label: 'Finish Round',
          icon: 'ri-stop-fill',
          command: () => gameStore.currentRound.secondsRemaining = 0
        },
        {
          label: 'Reset',
          icon: 'ri-stop-fill',
          command: () => location.reload()
        },
        {
          label: 'Card Management',
          icon: 'ri-settings-2-line',
          command: () => router.push('card_management')
        }
      ]
    }
  ]);

  const toggle = (event) => {
      menu.value.toggle(event);
  };

  const isHideBack = computed((event) => {
    return ['gamePlay', 'reviewRound', 'categories'].includes(gameStore.currentState)
  });

  onMounted(() => {
    randomCards.value = _.sampleSize(gameStore.cards, 3)
  }) 
</script>

<template>
  <div class='header-container'>
    <i @click='gameStore.goToPrevState' :class="['ri-arrow-left-s-line', { disabled: isHideBack }]"></i>
    <!-- <i class="ri-menu-line"></i> -->
    <div class='team-name'>{{ gameStore.currentTeam?.name }}</div>
    <i @click="toggle" class="ri-more-2-line"></i>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<style lang="scss">
  .p-menu-overlay.p-menu {
    background: white;
    color: #F04A22;
    font-weight: bold;
    border: none;
  }

  .p-menu-list {
    .p-submenu-header {
      color: #F04A22;
      font-weight: bold;
    }

    .p-menuitem:not(.p-disabled) {
      .p-menuitem-content, .p-menuitem-content:hover, .p-menuitem-icon, .p-menuitem-text {
        color: #F04A22;
        background: none;

        .p-menuitem-icon {
          font-weight: bold;
          color: #F04A22;
          margin-right: 5px;
        }
      }
    }
  }

</style>
<style scoped lang="scss">
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 7vh;

    .disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    .team-name {
      font-weight: bold;
      font-size: 20px;
    }

    i {
      font-size: 25px;
    }
  }
</style>
