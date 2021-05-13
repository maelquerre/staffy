import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Auth from '../views/Auth.vue'
import Score from '../views/Score.vue'
import Scores from '../views/Scores.vue'

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
    path: '/scores',
    name: 'scores',
    component: Scores,
  },
  {
    path: '/score/:hash',
    name: 'score',
    component: Score,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  const authRoutes = ['login', 'register']

  if (store.getters['auth/isAuthenticated'] && authRoutes.includes(to.name)) {
    next({ name: 'scores' })
  } else {
    next()
  }
})

export default router
