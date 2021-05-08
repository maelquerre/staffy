<template>
  <MonacoEditor
    ref="editor"
    :options="monacoOptions"
    :value="value"
    @change="$emit('change', $event)"
    @editorDidMount="initEditor"
  />
</template>

<script>
import abcjs from 'abcjs'
import { EditArea } from '../core/editor'

import MonacoEditor from 'vue-monaco'

export default {
  components: {
    MonacoEditor,
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    canvasId: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      monacoOptions: {
        acceptSuggestionOnEnter: 'smart',
        codeLens: false,
        cursorBlinking: 'smooth',
        dragAndDrop: true,
        disableMonospaceOptimizations: false,
        folding: false,
        fontSize: 12,
        hover: {
          enabled: true,
          delay: 1e3,
        },
        lightbulb: {
          enabled: false,
        },
        lineDecorationsWidth: 16,
        lineNumbers: 'off',
        lineNumbersMinChars: 3,
        links: false,
        minimap: {
          enabled: false,
        },
        quickSuggestions: true,
        quickSuggestionsDelay: 800,
        renderControlCharacters: false,
        renderLineHighlight: 'none',
        renderWhitespace: 'selection',
        scrollbar: {
          useShadows: false,
          verticalScrollbarSize: 9,
          verticalSliderSize: 5,
          horizontalScrollbarSize: 9,
          horizontalSliderSize: 5
        },
        scrollBeyondLastColumn: 2,
        scrollBeyondLastLine: false,
        showUnused: false,
        smoothScrolling: true,
        suggest: {
          localityBonus: true,
          shareSuggestSelections: true,
          hideStatusBar: false,
        },
        suggestSelection: 'recentlyUsedByPrefix',
        tabCompletion: 'on',
        useTabStops: true,
        wordWrap: 'off',
        wrappingIndent: 'same',
      }
    }
  },

  methods: {
    computeEditorSize() {
      this.$refs.editor.getEditor().layout()
    },

    initEditor() {
      new abcjs.Editor(new EditArea(this.$refs.editor), {
        canvas_id: this.canvasId,
        abcjsParams: {
          responsive: 'resize',
        },
      })

      setTimeout(this.computeEditorSize, 0) // force editor to re-compute the layout
      window.addEventListener('resize', this.computeEditorSize)
    },
  }
}
</script>
