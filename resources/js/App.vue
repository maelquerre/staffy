<template>
  <div class="h-full flex flex-col">
    <Header
      v-if="isHeaderShown"
      class="flex-shrink-0"
    />

    <main class="flex-grow flex flex-col">
      <RouterView />
      <Toast />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Header from './components/Header'
import Toast from './components/Toast'

export default {
  components: {
    Header,
    Toast,
  },

  computed: {
    isHeaderShown() {
      return !['login', 'register'].includes(this.$route.name)
    },
  },

  created() {
    this.authenticate().catch(() => {})
  },

  methods: {
    ...mapActions('auth', [
      'authenticate'
    ]),
  }
}
</script>
