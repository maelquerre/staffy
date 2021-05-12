<template>
  <input
    v-if="isEditing"
    v-model="title"
    v-focus
    class="block w-full text-center text-sm font-medium border border-gray-200 rounded focus:outline-none"
    type="text"
    @blur="renameScore"
    @keydown.enter="renameScore"
    @keydown.esc="cancelRename"
  >

  <div
    v-else-if="title"
    class="cursor-text border border-transparent hover:border-gray-200 rounded truncate"
    @click="isEditing = true"
  >
    {{ title }}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      title: '',
      isEditing: false,
    }
  },

  computed: {
    ...mapState({
      score: state => state.score.score,
      isFetchingScore: state => state.score.isFetchingScore,
    }),
  },

  watch: {
    score: {
      immediate: true,
      handler: function (score) {
        if (this.isFetchingScore || !score) {
          this.title = ''
        } else {
          this.title = score.title
        }
      }
    }
  },

  methods: {
    ...mapActions({
      updateScore: 'score/updateScore',
    }),

    cancelRename() {
      this.title = this.score.title
      this.isEditing = false
    },

    renameScore() {
      if (this.title === this.score.title) {
        return this.cancelRename()
      }

      const data = { title: this.title || 'Untitled' }

      return this.updateScore({ score: this.score, data })
        .then(() => {
          this.title = this.score.title
          this.isEditing = false
        })
        .catch(() => this.cancelRename())
    },
  },
}
</script>
