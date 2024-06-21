import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardManagement from '@/components/CardManagement.vue'
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
      path: '/card_management',
      name: 'cardManagement',
      component: CardManagement
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
