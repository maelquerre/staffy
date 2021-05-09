import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      score: state => state.score.score,
    }),
  },

  methods: {
    ...mapActions({
      createNewScore: 'score/newScore',
    }),

    createScore() {
      this.createNewScore().then(() => {
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
