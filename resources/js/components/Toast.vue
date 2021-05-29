<template>
  <div
    class="toasts"
  >
    <transition-group
      enter-active-class="ease-out duration-200"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
    >
      <div
        v-if="toasts.length > 0"
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
      >
        {{ toast.message }}

        <button
          v-if="toast.dismissible"
          class="close"
          @click="dismissToast({ id: toast.id })"
        >
          <XIcon
            size="16"
          />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { XIcon } from 'vue-feather-icons'

export default {
  components: {
    XIcon,
  },

  computed: {
    ...mapState('alerts', {
      toasts: 'toasts'
    }),
  },

  methods: {
    ...mapActions('alerts', {
      dismissToast: 'dismissToast'
    }),
  },
}
</script>
