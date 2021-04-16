import http from '../../service/http'

const state = {}
const getters = {}
const mutations = {}

const actions = {
  login(context, data) {
    return http.post('auth/login', data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default { state, getters, mutations, actions, namespaced: true }
