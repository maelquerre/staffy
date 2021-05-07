import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Auth from '../views/Auth'
import Dashboard from '../views/Dashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Auth,
    props: { isLoginShown: true },
  },
  {
    path: '/register',
    name: 'register',
    component: Auth,
    props: { isLoginShown: false },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: { isLoginShown: false },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  const authRoutes = ['login', 'register']

  if (store.getters['auth/isAuthenticated'] && authRoutes.includes(to.name)) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
