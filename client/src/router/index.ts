import { createRouter, createWebHistory } from 'vue-router'
import UserComponent from '@/components/UserComponent.vue'
import FoodComponent from '@/components/FoodComponent.vue'
import RateComponent from '@/components/RateComponent.vue'
import UserFoodComponent from '@/components/UserFoodComponent.vue'
import AuthCallbackComponent from '@/components/AuthCallbackComponent.vue'
import HomeComponent from '@/components/HomeComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeComponent},
    {path: '/user', name: 'user', component: UserComponent},
    {path: '/food', name: 'food', component: FoodComponent},
    {path: '/rate', name: 'rate', component: RateComponent},
    {path: '/userfood', name: 'userfood', component: UserFoodComponent},
    {path: '/auth_callback', name: 'auth_callback', component: AuthCallbackComponent}
  ]
})

export default router
