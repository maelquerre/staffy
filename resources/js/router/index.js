import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Auth from '../views/Auth.vue'
import General from '../views/settings/General.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Password from '../views/settings/Password.vue'
import Settings from '../views/settings/Settings.vue'
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
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    children: [
      {
        path: '',
        name: 'general-settings',
        component: General,
      },
      {
        path: 'password',
        name: 'password-settings',
        component: Password,
      }
    ]
  },
  {
    path: '*',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  const guestRoutes = ['login', 'register']

  if (store.getters['auth/isAuthenticated'] && guestRoutes.includes(to.name)) {
    next({ name: 'scores' })
  } else {
    next()
  }
})

export default router
