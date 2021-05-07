<template>
  <div class="h-full">
    <Header
      v-if="isHeaderShown"
    />

    <main class="h-full flex-auto flex flex-col items-center justify-center">
      <RouterView />
    </main>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  components: {
    Header,
  },

  computed: {
    isHeaderShown() {
      return !['login', 'register'].includes(this.$route.name)
    },
  },
}
</script>
