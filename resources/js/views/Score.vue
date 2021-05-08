<template>
  <div v-if="!editorValue">
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
        :value="editorValue"
        @change="editorValue = $event"
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
    }),

    editorValue: {
      get() {
        if (!this.score) {
          return null
        }

        const content = this.score.content ? `\n${this.score.content.trimStart()}` : ''

        return content.replace(/(\n) +/g, '$1')
      }
    }
  },

  created() {
    this.fetchScore({ hash: this.$route.params.hash })
      .catch((response) => {
        console.log(response)
      })
  },

  methods: {
    ...mapActions({
      fetchScore: 'score/fetchScore'
    }),
  }
}
</script>
