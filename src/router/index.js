import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Eleve.vue'
import Jury from '@/views/Jury.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/planning/eleve/:id',
        name: 'Eleve',
        component: Home
    },
    {
        path: '/planning/jury/:id',
        name: 'jury',
        component: Jury
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router