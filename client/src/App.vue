<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
<div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="btn-group">
        <router-link to="/user" class="btn btn-dark btn-secondary">User</router-link>
        <router-link to="/food" class="btn btn-dark btn-secondary">Food</router-link>
        <router-link to="/rate" class="btn btn-dark btn-secondary">Rate</router-link>
      </div>
    </nav>
    <div class="alert-area">
    </div>
  </div>
  <RouterView />
</template>

<style scoped></style>
