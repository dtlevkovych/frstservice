<script setup>
import UserComponent from '@/components/UserComponent.vue'
import FoodComponent from '@/components/FoodComponent.vue'
import RateComponent from '@/components/RateComponent.vue'
import UserFoodComponent from '@/components/UserFoodComponent.vue'

export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
  <div>
    <UserComponent />
    <FoodComponent />
    <RateComponent />
    <UserFoodComponent />
  </div>
</template>

<style>
</style>
