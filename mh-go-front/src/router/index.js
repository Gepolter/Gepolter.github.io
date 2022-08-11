import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import rg4js from 'raygun4js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.afterEach((to, from) => {
  rg4js('trackEvent', {
    type: 'pageView',
    path: to.path
  });
})
export default router
