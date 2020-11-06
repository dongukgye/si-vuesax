import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // ======================
        // Blank Layout
        // ======================    
        {
            path: '',
            component: () => import('@/layout/blank/Blank.vue'),
            // ======================
            // Theme routes / pages
            // ======================
            children: [{
                path: '/',
                redirect: '/login'
            }, {
                path: '/login',
                name: 'Login',
                index: 1,
                component: () => import('@/views/authentication/Login.vue')
            }, {
                path: '/error404',
                name: 'Error 404',
                index: 2,
                component: () => import('@/views/authentication/Error404.vue')
            }, {
                path: '/register',
                name: 'Register',
                index: 3,
                component: () => import('@/views/authentication/Register.vue')
            }]
        },
        {
            // ======================
            // Full Layout
            // ======================
            path: '',
            component: () => import('@/layout/full/MainContainer.vue'),
            // ======================
            // Theme routes / pages
            // ======================
            meta: { requiresAuth: true },
            children: [{
                path: '/dashboard',
                name: 'Dashboard',
                index: 1,
                i18n: 'Dashboard',
                component: () => import('@/views/StarterPage.vue')
            }, {
                path: '/units',
                name: 'Units',
                index: 2,
                i18n: 'Units',
                component: () => import('@/views/Units.vue')
            }, {
                path: '/tasks',
                name: 'Tasks',
                index: 3,
                i18n: "Tasks",
                component: () => import('@/views/Tasks.vue')
            }, {
                path: '/parts',
                name: 'Parts',
                index: 4,
                i18n: "Parts",
                component: () => import('@/views/Parts.vue')
            }, {
                path: '/categories',
                name: 'Categories',
                index: 5,
                i18n: "Categories",
                component: () => import('@/views/Categories.vue')
            }, {
                path: '/orders',
                name: 'Orders',
                index: 6,
                i18n: "Orders",
                component: () => import('@/views/Orders.vue')
            }]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/Error404'
        }
    ]
})

import NProgress from 'nprogress';

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isAuthenticated) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})
export default router