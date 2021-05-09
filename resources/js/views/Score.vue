<template>
  <div v-if="!scoreContent">
    Loading
  </div>

  <div
    v-else
    class="flex-grow flex overflow-hidden"
  >
    <div class="w-1/2 relative">
      <Editor
        class="absolute inset-0"
        canvasId="preview"
        :value="scoreContent"
        @change="updateEditorValue"
      />
    </div>

    <div class="w-1/2 p-4 bg-gray-100 overflow-auto">
      <div
        id="preview"
        class="bg-white"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Editor from '../components/Editor'

export default {
  components: {
    Editor,
  },

  computed: {
    ...mapState({
      score: state => state.score.score,
      scoreContent: state => state.score.scoreContent,
      isSavingScore: state => state.score.isSavingScore,
    }),
  },

  created() {
    this.fetchScore({ hash: this.$route.params.hash })
      .catch((response) => {
        console.log(response)
      })
  },

  mounted() {
    document.addEventListener('keydown', this.saveScoreListener)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.saveScoreListener)
  },

  methods: {
    ...mapActions({
      fetchScore: 'score/fetchScore',
      saveScore: 'score/saveScore',
      updateScoreContent: 'score/updateScoreContent',
    }),

    updateEditorValue(editorValue) {
      this.updateScoreContent({ content: editorValue })
    },

    saveScoreListener(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()

        const data = { content: this.scoreContent }
        this.saveScore(data)
      }
    },
  }
}
</script>
