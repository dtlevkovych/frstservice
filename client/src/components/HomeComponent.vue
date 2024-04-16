<script>
import LoginComponent from "@/components/LoginComponent.vue"
import UserComponent from "@/components/UserComponent.vue"

export default {
    data: function () {
      return {
        
      }
    },
    components: {
      "UserComponent": UserComponent,
      "LoginComponent": LoginComponent
    },
}
</script>

<template>
  <article id="article-user" v-if="this.$store.state.auth_user == null">
    <LoginComponent />
  </article>
  <article id="article-user" v-if="this.$store.state.auth_user != null">
    <UserComponent />
  </article>
</template>