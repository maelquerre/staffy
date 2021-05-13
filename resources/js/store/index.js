import Vue from 'vue'
import Vuex from 'vuex'

import alerts from './modules/alerts'
import auth from './modules/auth'
import score from './modules/score'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    alerts,
    auth,
    score,
  }
})

export default store
