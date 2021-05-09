import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      score: state => state.score.score,
    }),
  },

  methods: {
    ...mapActions({
      newScore: 'score/newScore',
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
