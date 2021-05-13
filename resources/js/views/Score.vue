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
import { mapActions, mapMutations, mapState } from 'vuex'

import Editor from '../components/Editor'

export default {
  components: {
    Editor,
  },

  computed: {
    ...mapState('score', {
      score: 'score',
      scoreContent: 'scoreContent',
      isUpdatingScore: 'isUpdatingScore',
    }),
  },

  created() {
    this.setScore({ score: null })
    this.fetchScore({ hash: this.$route.params.hash })
  },

  mounted() {
    document.addEventListener('keydown', this.saveScoreListener)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.saveScoreListener)
  },

  methods: {
    ...mapMutations('score', {
      setScore: 'setScore',
    }),

    ...mapActions('alerts', {
      toast: 'toast',
    }),

    ...mapActions('score', {
      fetchScore: 'fetchScore',
      updateScore: 'updateScore',
      updateScoreContent: 'updateScoreContent',
    }),

    updateEditorValue(editorValue) {
      this.updateScoreContent({ content: editorValue })
    },

    saveScoreListener(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()

        const data = { content: this.scoreContent }
        this.updateScore({ score: this.score, data })
      }
    },
  }
}
</script>
