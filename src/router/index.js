import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameSettings from '@/components/GameOptions.vue'
import SelectStartingWord from '@/components/SelectStartingWord.vue'
import GamePlay from '@/components/GamePlay.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gameSettings',
      name: 'gameSettings',
      component: GameSettings
    },
    {
      path: '/selectStartingWord',
      name: 'selectStartingWord',
      component: SelectStartingWord
    },
    {
      path: '/gamePlay',
      name: 'gamePlay',
      component: GamePlay
    },
  ]
})

export default router
