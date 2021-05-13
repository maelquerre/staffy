import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('score', {
      score: 'score',
    }),
  },

  methods: {
    ...mapActions('score', {
      newScore: 'newScore',
    }),

    createScore() {
      this.newScore().then(() => {
        this.$router.push({
          name: 'score',
          params: {
            hash: this.score.hash
          }
        })
      })
    },
  }
}
