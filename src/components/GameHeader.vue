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
    gameStore.currentState = 'gamePlay'
  }

  const menu = ref();
  const items = ref([
    {
      label: 'Menu',
      items: [
        {
          label: 'Stop Game',
          icon: 'ri-stop-fill'
        },
        {
          label: 'Game Options',
          icon: 'ri-settings-2-line'
        }
      ]
    }
  ]);

  const toggle = (event) => {
      menu.value.toggle(event);
  };

  onMounted(() => {
    randomCards.value = _.sampleSize(gameStore.cards, 3)
  }) 
</script>

<template>
  <div class='header-container'>
    <i class="ri-arrow-left-s-line"></i>
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
    .p-menu-submenu-label {
      color: #F04A22;
    }

    .p-menu-item:not(.p-disabled) {
      .p-menu-item-content, .p-menu-item-content:hover, .p-menu-item-icon {
        color: #F04A22;
        background: none;
        font-weight: bold;

        .p-menu-item-icon {
          font-weight: bold;
          color: #F04A22;
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

    .settings-icon {
      color: #F04A22;
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
