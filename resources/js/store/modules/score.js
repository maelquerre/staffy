import api from '../../service/api'
import { randomString } from '../../core/utils'
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'

const state = {
  score: null,
  scores: [],
  scoreContent: null,
  isDownloadingScore: false,
  isFetchingScore: false,
  isFetchingScores: false,
  isUpdatingScore: false,
}

const getters = {
  hasScoreContentChanged(state) {
    return state.scoreContent !== state.score.content
  },
}

const mutations = {
  setScore(state, { score }) {
    state.score = score
    state.scoreContent = score ? score.content : null
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

  setIsFetchingScores(state, value) {
    state.isFetchingScores = value
  },

  setIsUpdatingScore(state, value) {
    state.isUpdatingScore = value
  },
}

const actions = {
  fetchScore({ commit }, { hash }) {
    commit('setIsFetchingScore', true)

    return api.get(`scores/${hash}`)
      .then(({ data }) => {
        commit('setScore', { score: data.data })
        commit('setIsFetchingScore', false)
      })
      .catch(() => {
        commit('setIsFetchingScore', false)
      })
  },

  fetchScores({ commit }) {
    commit('setIsFetchingScores', true)

    return api.get(`scores`)
      .then(({ data }) => {
        commit('setScores', { scores: data.data })
        commit('setIsFetchingScores', false)
      })
      .catch(() => {
        commit('setIsFetchingScores', false)
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

  downloadScore(context) {
    const doc = new jsPDF()
    const svg = document.querySelector('#preview').querySelector('svg')

    doc
      .svg(svg, {
        x: 0,
        y: 0,
        width: svg.offsetWidth,
        height: svg.offsetHeight
      })
      .then(() => {
        // save the created pdf
        doc.save(`${context.state.score.title}.pdf`)
      })
  },

  updateScore({ commit, dispatch, state }, { score, data }) {
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

        const toast = { message: 'Score saved successfully.' }
        dispatch('alerts/toast', toast, { root: true })

        window.onbeforeunload = null
      })
      .catch(() => {
        commit('setIsUpdatingScore', false)

        const toast = { message: 'There was an error saving your score. Please try again later.' }
        dispatch('alerts/toast', toast, { root: true })
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
    window.onbeforeunload = () => 'Changes may not be saved. Leave anyway?'
  },
}

export default { state, getters, mutations, actions, namespaced: true }
