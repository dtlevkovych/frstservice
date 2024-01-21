<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
<div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="btn-group">
        <router-link to="/" class="btn btn-dark btn-secondary">
          User
        </router-link>
        <router-link to="/food" class="btn btn-dark btn-secondary">
          Food
        </router-link>
        <router-link to="/rate" class="btn btn-dark btn-secondary">
          Rate
        </router-link>
      </div>
    </nav>
  </div>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <RouterView />
</template>

<style scoped></style>
