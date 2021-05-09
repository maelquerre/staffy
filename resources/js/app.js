import './bootstrap'

import Vue from 'vue'

import router from './router'
import store from './store'

import App from './App.vue'

// Directives

import { focus } from './core/directives'

Vue.directive('focus', focus)

// Filters

import { date } from './core/filters'

Vue.filter('date', date)

// Instance

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
