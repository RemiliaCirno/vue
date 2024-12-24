import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/1130end.vue'
import login from '../components/login.vue'



const routes = [
  {
    path:'/home',
    name:Home,
    component:Home
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/',
    redirect:'/login'
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router
