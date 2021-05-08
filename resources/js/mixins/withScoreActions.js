import { mapActions } from 'vuex'

export default {
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
