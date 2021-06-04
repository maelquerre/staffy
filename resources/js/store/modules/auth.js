import api from '../../service/api'

const state = {
  user: null,
}

const getters = {
  isAuthenticated(state) {
    return state.user !== null
  },
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

const actions = {
  authenticate(context) {
    return api.get('auth/authenticate')
      .then(({ data }) => {
        context.commit('setUser', data.data)
      })
  },

  async login(context, data) {
    await axios.get('/sanctum/csrf-cookie')

    return api.post('auth/login', data)
      .then(({ data }) => {
        context.commit('setUser', data.data)
      })
  },

  register(context, data) {
    return api.post('auth/register', data)
      .then(({ data }) => {
        context.commit('setUser', data.data)
      })
  },

  logout(context) {
    return api.post('auth/logout')
      .then(() => {
        context.commit('setUser', null)
      })
  },

  updateUser(context, data) {
    return api.patch('user', data)
      .then(({ data }) => {
        context.commit('setUser', data.data)
      })
  },
}

export default { state, getters, mutations, actions, namespaced: true }
