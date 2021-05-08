import api from '../../service/api'
import { randomString } from '../../core/utils'

const state = {
  score: {
    title: 'The Brown Haired Maiden',
    content: `
      T:The Brown Haired Maiden
      C:Traditional, Arr. PM Jay Salter
      N:Very common tune.
      Z:Transcribed Sept. 28, 2003 by Andrew T. Lenz, Jr.
      R:March
      M:2/4
      L:1/8
      Q:1/4=80
      K:HP
      |: A | {Gdc}d3/2c/2 {g}B{G}A | {Gdc}d2 {e} A3/2{Gdc}d/2 | {g}fd {gf}gf | {g}fe {A} e{gf}g |
      \\
      |f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}f2 {gf}ge | {Gdc}d2 {gdG}d :|
      \\
      |{gf}g | f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}fd {gf}gf | {g}fe {A} e{gf}g |
      \\
      |f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}f2 {gf}ge | {Gdc}d2 {gdG}d{gf}g |
      \\
      |f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}fd {gf}gf | {g}fe {A} e{gf}g |
      \\
      |a3/2g/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}f2 {gf}ge | {Gdc}d2 {gdG}d |]
    `
  },
}

const getters = {
  score: state => state.score,
}

const mutations = {
  setScore(state, { score }) {
    state.score = score
  },
}

const actions = {
  fetchScore(context, { hash }) {
    return api.get(`scores/${hash}`).then(({ data }) => {
      context.commit('setScore', { score: data.data })
    })
  },

  createScore(context) {
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
}

export default { state, getters, mutations, actions, namespaced: true }
