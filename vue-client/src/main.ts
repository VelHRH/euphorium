import './assets/main.css'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { createApp, h, provide } from 'vue'

import { apolloClient } from '@/lib/apollo'
import App from './app.vue'
import router from './router'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
