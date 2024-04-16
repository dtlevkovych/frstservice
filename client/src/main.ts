import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'

const store = createStore({
    state () {
      return {
        auth_user: null
      }
    },
    mutations: {
      setAuthUser (au) {
        state.auth_user = au;
      }
    }
  })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
