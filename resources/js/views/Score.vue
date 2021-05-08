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
import Editor from '../components/Editor'
import { mapState } from 'vuex'

export default {
  components: {
    Editor,
  },

  data() {
    return {
      editorValue: null,
    }
  },

  computed: {
    ...mapState('score', [
      'score',
    ]),
  },

  created() {
    this.initEditorValue()
  },

  methods: {
    initEditorValue() {
      const content = this.score.content ? `\n${this.score.content.trimStart()}` : ''

      this.editorValue = content.replace(/(\n) +/g, '$1')
    }
  }
}
</script>
