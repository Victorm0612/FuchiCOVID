import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Covid from '../views/Covid.vue'
import Dashboard from '../views/DashBoard.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/covid',
        name: 'Covid',
        component: Covid
    },
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            is_admin: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({
                name: 'Login',
            })
        } else if (to.matched.some(route => route.meta.is_pro)) {
            if (store.getters.retrieveUser.type_user == 2) {
                next()
            } else {
                next({
                    name: 'Home'
                })
            }
        } else if (to.matched.some(route => route.meta.is_admin)) {
            if (store.getters.retrieveUser.type_user == 1) {
                next()
            } else {
                next({
                    name: 'Home'
                })
            }
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'Home'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;