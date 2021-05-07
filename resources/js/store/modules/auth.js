import api from '../../service/api'

const state = {
  user: null,
}

const getters = {
  isAuthenticated(state) {
    return state.user !== null
  }
}

const mutations = {
  setUser(state, { user }) {
    state.user = user
  },
}

const actions = {
  async login(context, data) {
    await axios.get('/sanctum/csrf-cookie')

    return api.post('auth/login', data)
      .then(({ data }) => {
        context.commit('setUser', { user: data.data })
      })
  },

  async register(context, data) {
    return api.post('auth/register', data)
      .then(({ data }) => {
        context.commit('setUser', { user: data.data })
      })
  }
}

export default { state, getters, mutations, actions, namespaced: true }
