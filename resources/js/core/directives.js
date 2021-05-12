const focus = {
  inserted(el) {
    el.focus()
  },
}

const clickOutside = {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!el.contains(event.target)) {
        vnode.context[binding.expression](event)
      }
    }

    document.body.addEventListener('click', el.clickOutsideEvent)
  },

  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}

export { clickOutside, focus }
