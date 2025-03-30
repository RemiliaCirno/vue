import { createRouter, createWebHistory } from 'vue-router'
import BootLoader from '../components/BootLoader.vue'
import MainComponent from '../components/now.vue'
import Bakafunky from '../components/baka.vue'

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
    {
        path: '/baka',
        name: 'Baka',
        component: Bakafunky
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