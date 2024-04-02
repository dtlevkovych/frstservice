<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
<div>
    <div class="dropdown d-grid justify-content-md-end">
      <button class="btn btn-light btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="./assets/settings.png" /></button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/">User</a></li>
        <li><a class="dropdown-item" href="/food">Food</a></li>
        <li><a class="dropdown-item" href="/rate">Rate</a></li>
      </ul>
    </div>
    <div class="alert-area">
    </div>
  </div>
  <RouterView />
</template>

<style scoped></style>
