import './bootstrap'

import Vue from 'vue'

import router from './router'
import store from './store'

import App from './App.vue'

import { date } from './core/filters'

Vue.filter('date', date)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
