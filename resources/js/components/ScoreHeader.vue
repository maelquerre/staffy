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
    v-else
    class="cursor-text hover:border border-gray-200 rounded"
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
      const data = { title: this.title || 'Untitled' }

      this.updateScore({ score: this.score, data })
        .then(() => {
          this.title = this.score.title
          this.isEditing = false
        })
        .catch(() => this.cancelRename())
    },
  },
}
</script>
