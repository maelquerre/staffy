export default {
  data() {
    return {
      errors: {},
    }
  },

  methods: {
    onAuthenticationSuccess() {
      this.$router.push({ name: 'scores' })
    },

    onAuthenticationError({ response }) {
      if (response.data.errors) {
        this.errors = response.data.errors
      } else if (response.data.message) {
        this.errors = { 'global': [response.data.message] }
      }
    },
  },
}
