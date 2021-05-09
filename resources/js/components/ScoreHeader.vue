<template>
  <input
    v-if="isEditing"
    v-model="title"
    v-focus
    class="block w-full text-center text-sm font-medium border border-gray-200 rounded focus:outline-none"
    type="text"
    @blur="submitEdit"
    @keydown.enter="submitEdit"
    @keydown.esc="cancelEdit"
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
import { mapActions } from 'vuex'

export default {
  props: {
    score: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      title: this.score.title,
      isEditing: false,
    }
  },

  methods: {
    ...mapActions({
      saveScore: 'score/saveScore',
    }),

    cancelEdit() {
      this.title = this.score.title
      this.isEditing = false
    },

    submitEdit() {
      const { hash } = this.score
      const data = { title: this.title || 'Untitled' }

      this.saveScore({ hash, data })
        .then(() => {
          this.title = this.score.title
          this.isEditing = false
        })
        .catch(() => this.cancelEdit())
    },
  },
}
</script>
