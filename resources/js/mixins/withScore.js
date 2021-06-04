import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('score', {
      score: 'score',
    }),
  },

  methods: {
    ...mapActions({
      createScore: 'score/createScore',
      toast: 'alerts/toast',
    }),

    handleCreateScore() {
      this.createScore()
        .then(() => {
          this.$router.push({
            name: 'score',
            params: {
              hash: this.score.hash
            }
          })
        })
        .catch(() => {
          this.toast({ message: 'There was an error creating your score. Please try again later.' })
        })
    },
  }
}
