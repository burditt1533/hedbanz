<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import router from '@/router'
import { game } from '@/stores/game'
import logo from '@/assets/hedbanz-logo.png'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const gameStore = game()
const isModalOpen = ref(false)
const currentCategory = ref({})

const playCategory = () => {
  isModalOpen.value = !isModalOpen.value
  gameStore.updateCurrentCategory(currentCategory.value)
  gameStore.currentState = 'gameOptions'
}

const openModal = (category) => {
  currentCategory.value = category
  isModalOpen.value = !isModalOpen.value
}

onMounted(() => {
})

</script>

<template>
  <div class="top-section">
    <div class="header">
      <img :src="logo" class="logo">
    </div>
  </div>
  <div class="bottom-section">
    <h2>Categories</h2>

    <div class="categories">
      <div
        v-for='category in gameStore.categories' :key='category.id'
        @click='openModal(category)'
        class="category"
      >
        <div class='category-name'>{{ category.name }}</div>
        <i :class="[category.icon, 'category-icon']"></i>
        <div class="footer">
          <div class="difficulty">
            <div v-for='star in category.difficulty' :key='star' class="star">
              ★
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="isModalOpen" modal :header="currentCategory?.name" dismissableMask :style="{ width: '17rem' }">
      <i :class="[currentCategory?.icon, 'category-icon']"></i>
      <div class='description'>
        {{ currentCategory?.description }}
      </div>
      <div class="flex justify-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="isModalOpen = false"></Button>
          <Button type="button" label="Play" @click="playCategory"></Button>
      </div>
  </Dialog>

</template>

<style scoped lang="scss">
  .top-section {
    width: 100%;
    height: 23vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      width: 120px;
    }
  }

  .bottom-section {
    width: 100%;
    background: white;
    color: #F04A22;
    overflow: scroll;
    padding-bottom: 50px;

    h2 {
      text-align: center;
      font-weight: bold;
      margin: 30px;
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      align-items: center;

      .category {
        text-align: center;
        width: 40%;
        font-weight: bold;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #e4e4e4;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .category-name {
          font-size: 16px;
          font-weight: bold;
        }

        .category-icon {
          font-size: 30px;
          line-height: 40px;
        }

        .difficulty {
          display: flex;
          font-size: 10px;
          align-self: flex-start;
        }
      }
    }
  }

  .description {
    margin-bottom: 40px;
  }


</style>
