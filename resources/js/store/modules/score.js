import api from '../../service/api'
import { randomString } from '../../core/utils'

const state = {
  score: null,
  scores: [],
  scoreContent: '',
  isSavingScore: false,
}

const getters = {}

const mutations = {
  setScore(state, { score }) {
    state.score = score
    state.scoreContent = score.content
  },

  setScores(state, { scores }) {
    state.scores = scores
  },

  setScoreContent(state, { content }) {
    state.scoreContent = content
  },

  setIsSavingScore(state, value) {
    state.isSavingScore = value
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

  saveScore({ commit, state }, data) {
    if (state.isSavingScore) return

    commit('setIsSavingScore', true)
    return api.patch(`scores/${state.score.hash}`, data)
      .then(({ data }) => {
        commit('setScore', { score: data.data })
        commit('setIsSavingScore', false)
      })
  },

  deleteScore(context, { score }) {
    return api.delete(`scores/${score.hash}`)
      .then(() => {
        context.commit('setScores', { scores: context.state.scores.filter(({ hash }) => hash !== score.hash) })
      })
  },

  updateScoreContent(context, { content }) {
    context.commit('setScoreContent', { content })
  },
}

export default { state, getters, mutations, actions, namespaced: true }
