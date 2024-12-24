import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './1130end.vue'
import login from './login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: login },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})