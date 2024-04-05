<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div>
      <div class="d-flex flex-row-reverse bd-highlight">
        <div class="p-2 bd-highlight">
          <div class="dropdown">
            <button class="btn btn-light btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="./assets/settings.png" /></button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/">User</a></li>
              <li><a class="dropdown-item" href="/food">Food</a></li>
              <li><a class="dropdown-item" href="/rate">Rate</a></li>
            </ul>
          </div>
        </div>
        <div class="p-2 bd-highlight" id="gl-back">
        </div>
      </div>
    </div>
    <div class="alert-area">
    </div>
  </div>
  <RouterView />
</template>

<style scoped></style>
