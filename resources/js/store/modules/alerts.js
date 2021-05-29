const state = {
  alert: null,
  notifications: [],
  toasts: [],
}

const getters = {}

const mutations = {
  setAlert(state, alert) {
    state.alert = alert
  },

  addNotification(state, notification) {
    state.notifications.push(notification)
  },

  removeNotification(state, { id }) {
    const index = state.notifications.findIndex((notification) => notification.id === id)

    if (index > -1) {
      state.notifications.splice(index, 1)
    }
  },

  addToast(state, toast) {
    state.toasts.push(toast)
  },

  removeToast(state, { id }) {
    const index = state.toasts.findIndex((toast) => toast.id === id)

    if (index > -1) {
      state.toasts.splice(index, 1)
    }
  },

  setToasts(state, toasts) {
    state.toasts = toasts
  }
}

const actions = {
  alert(context, alert) {
    context.commit('setAlert', alert)
  },

  dismissAlert(context) {
    context.commit('setAlert', null)
  },

  notify(context, notification) {
    context.commit('addNotification', notification)
  },

  dismissNotification(context, { id }) {
    context.commit('removeNotification', { id })
  },

  toast(context, toast) {
    toast = {
      ...toast,
      id: Math.floor(Math.random() * 1000)
    }

    context.commit('setToasts', [])
    context.commit('addToast', toast)

    if (!toast.dismissible) {
      setTimeout(() => {
        context.commit('removeToast', { id: toast.id })
      }, 2000)
    }
  },

  dismissToast(context, { id }) {
    context.commit('removeToast', { id })
  }
}

export default { state, getters, mutations, actions, namespaced: true }
