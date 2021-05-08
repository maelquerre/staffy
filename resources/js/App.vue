<template>
  <div class="h-full flex flex-col">
    <Header
      v-if="isHeaderShown"
      class="flex-shrink-0"
    />

    <main class="flex-grow flex flex-col">
      <RouterView />
    </main>
  </div>
</template>

<script>
import Header from './components/Header'
import { mapActions } from 'vuex'

export default {
  components: {
    Header,
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
