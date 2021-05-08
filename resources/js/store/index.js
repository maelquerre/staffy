import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import score from './modules/score'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    score,
  }
})

export default store
