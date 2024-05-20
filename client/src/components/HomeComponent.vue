<script>
import LoginComponent from "@/components/LoginComponent.vue"
import UserComponent from "@/components/UserComponent.vue"
import { store } from '@/stores/store.js'

export default {
    data: function () {
      return {
        store
      }
    },
    components: {
      "UserComponent": UserComponent,
      "LoginComponent": LoginComponent
    },
}
</script>

<template>
  <article id="article-user" v-if="store.auth_user == null">
    <LoginComponent />
  </article>
  <article id="article-user" v-if="store.auth_user != null">
    <UserComponent />
  </article>
</template>