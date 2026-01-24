import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp, h } from 'vue'

import App from './app.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp({
  setup() {
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
