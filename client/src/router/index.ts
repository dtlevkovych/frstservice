import { createRouter, createWebHistory } from 'vue-router'
import UserComponent from '@/components/UserComponent.vue'
import FoodComponent from '@/components/FoodComponent.vue'
import RateComponent from '@/components/RateComponent.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: UserComponent
    },
    {
      path: '/food',
      name: 'food',
      component: FoodComponent
    },
    {
      path: '/rate',
      name: 'rate',
      component: RateComponent
    }
  ]
})

export default router
