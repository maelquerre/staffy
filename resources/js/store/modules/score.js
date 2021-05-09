import api from '../../service/api'
import { randomString } from '../../core/utils'

const state = {
  score: null,
  scores: [],
  scoreContent: '',
  isFetchingScore: false,
  isUpdatingScore: false,
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

  setIsFetchingScore(state, value) {
    state.isFetchingScore = value
  },

  setIsUpdatingScore(state, value) {
    state.isUpdatingScore = value
  },
}

const actions = {
  fetchScore({ commit, state }, { hash }) {
    commit('setIsFetchingScore', true)

    return api.get(`scores/${hash}`).then(({ data }) => {
      commit('setScore', { score: data.data })
      commit('setIsFetchingScore', false)
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

    return context.dispatch('storeScore', { score })
      .then(({ data }) => {
        context.commit('setScore', { score: data.data })
      })
  },

  storeScore(context, { score }) {
    return api.post(`scores`, score)
  },

  updateScore({ commit, state }, { score, data }) {
    if (state.isUpdatingScore === score.id) return

    commit('setIsUpdatingScore', score.id)

    return api.patch(`scores/${score.hash}`, data)
      .then(({ data }) => {
        const updatedScore = data.data

        commit('setScore', { score: updatedScore })

        commit('setScores', {
          scores: state.scores.map((score) => {
            if (score.hash === updatedScore.hash) {
              return updatedScore
            }

            return score
          })
        })

        commit('setIsUpdatingScore', false)
      })
  },

  deleteScore(context, { score }) {
    return api.delete(`scores/${score.hash}`)
      .then(() => {
        context.commit('setScores', {
          scores: context.state.scores.filter(({ hash }) => hash !== score.hash)
        })
      })
  },

  updateScoreContent(context, { content }) {
    context.commit('setScoreContent', { content })
  },
}

export default { state, getters, mutations, actions, namespaced: true }
