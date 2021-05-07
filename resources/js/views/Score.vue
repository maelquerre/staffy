<template>
  <div class="flex-grow flex flex-col overflow-hidden">
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
  </div>
</template>

<script>
import score from './score'

import Editor from '../components/Editor'

export default {
  components: {
    Editor,
  },

  data() {
    return {
      score,
      editorValue: null,
    }
  },

  created() {
    this.initEditorValue()
  },

  methods: {
    initEditorValue() {
      const title = this.score.title ? `\nT:${this.score.title}` : ''
      const composer = this.score.composer ? `\nC:${this.score.composer}` : ''
      const key = this.score.key ? `\nK:${this.score.key}` : ''
      const content = this.score.content ? `\n${this.score.content.trimStart()}` : ''

      this.editorValue = `X:1${title}${composer}${key}${content}`.replace(/(\n) +/g, '$1')
    }
  }
}
</script>
