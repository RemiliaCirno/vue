import { createRouter, createWebHistory } from 'vue-router'
import BootLoader from '../components/BootLoader.vue'
import MainComponent from '../components/now.vue' // 你的主页面组件

const routes = [
    {
        path: '/',
        name: 'Boot',
        component: BootLoader
    },
    {
        path: '/main',
        name: 'Main',
        component: MainComponent
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/views/NotFound.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router