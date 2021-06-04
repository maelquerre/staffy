<template>
  <div
    v-if="isFetchingScore"
    class="flex-grow flex items-center justify-center"
  >
    <div class="flex flex-col items-center">
      <Spinner
        size="md"
      />

      <div class="mt-4 text-gray-400">
        Loading editor
      </div>
    </div>
  </div>

  <div
    v-else-if="scoreContent !== null"
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

  <div
    v-else
    class="flex-grow flex items-center justify-center px-4"
  >
    <NotFound
      message="The requested score doesn't exist or you don't have access to it."
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import Editor from '../components/Editor'
import NotFound from './NotFound'
import Spinner from '../components/Spinner'

export default {
  components: {
    Editor,
    NotFound,
    Spinner,
  },

  computed: {
    ...mapState('score', {
      score: 'score',
      scoreContent: 'scoreContent',
      isFetchingScore: 'isFetchingScore',
      isUpdatingScore: 'isUpdatingScore',
    }),

    ...mapGetters('score', {
      hasScoreContentChanged: 'hasScoreContentChanged',
    }),
  },

  created() {
    this.setScore(null)
    this.fetchScore({ hash: this.$route.params.hash })
  },

  mounted() {
    document.addEventListener('keydown', this.saveScoreListener)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.saveScoreListener)
  },

  beforeRouteLeave(tp, from, next) {
    if (this.hasScoreContentChanged) {
      window.confirm('Changes you made may not be saved. Leave anyway?') && next()
    } else {
      next()
    }
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
