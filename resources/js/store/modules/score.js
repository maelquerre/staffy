import api from '../../service/api'
import { randomString } from '../../core/utils'

const state = {
  score: null,
  scores: [],
}

const getters = {}

const mutations = {
  setScore(state, { score }) {
    state.score = score
  },

  setScores(state, { scores }) {
    state.scores = scores
  },
}

const actions = {
  fetchScore(context, { hash }) {
    return api.get(`scores/${hash}`).then(({ data }) => {
      context.commit('setScore', { score: data.data })
    })
  },

  fetchScores(context) {
    return api.get(`scores`).then(({ data }) => {
      context.commit('setScores', { scores: data.data })
    })
  },

  newScore(context) {
    const score = {
      title: 'Untitled',
      hash: randomString(8),
      content: 'X:1'
    }

    return api.post(`scores`, score)
      .then(({ data }) => context.commit('setScore', { score: data.data }))
  },

  saveScore(context, { score }) {
    return api.patch(`scores/${score.hash}`, score)
  },

  deleteScore(context, { score }) {
    return api.delete(`scores/${score.hash}`)
      .then(() => {
        context.commit('setScores', { scores: context.state.scores.filter(({ hash }) => hash !== score.hash) })
      })
  }
}

export default { state, getters, mutations, actions, namespaced: true }
