<template>
  <div class="flex-grow flex flex-col">
    <div class="flex-grow flex">
      <!--
      <textarea
        id="content"
        v-model="content"
        class="w-1/2 font-mono"
      />
      -->
      <div
        class="w-1/2">
        <MonacoEditor
          id="editor"
          v-model="content"
          :options="monacoOptions"
          style="width: 600px; height: 800px;"
        />
      </div>


      <div
        class="w-1/2 p-4 bg-gray-100"
      >
        <div
          id="preview"
          class="bg-white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import abcjs from 'abcjs'
import MonacoEditor from 'vue-monaco'

export default {
  components: {
    MonacoEditor,
  },

  data() {
    return {
      content: `X:1
T:The Brown Haired Maiden
N:Very common tune.
Z:Transcribed Sept. 28, 2003 by Andrew T. Lenz, Jr.
C:Traditional, Arr. PM Jay Salter
R:March
M:2/4
L:1/8
Q:1/4=80
K:HP
|: A | {Gdc}d3/2c/2 {g}B{G}A | {Gdc}d2 {e} A3/2{Gdc}d/2 | {g}fd {gf}gf | {g}fe {A} e{gf}g |
\\
|f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}f2 {gf}ge | {Gdc}d2 {gdG}d :|
\\
|{gf}g | f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}fd {gf}gf | {g}fe {A} e{gf}g |
\\
|f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}f2 {gf}ge | {Gdc}d2 {gdG}d{gf}g |
\\
|f/2a3/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}fd {gf}gf | {g}fe {A} e{gf}g |
\\
|a3/2g/2 {fg}fa | A2 {Gdc}d3/2e/2 | {g}f2 {gf}ge | {Gdc}d2 {gdG}d |]`,

      monacoOptions: {
        lineDecorationsWidth: 16,
        lineNumbers: 'off',
        lineNumbersMinChars: 3,
        wordWrap: 'off',
        wrappingIndent: 'same',
        scrollBeyondLastLine: false,
        scrollBeyondLastColumn: 2,
        smoothScrolling: true,
        useTabStops: true,
        showUnused: false,
        folding: false,
        cursorBlinking: 'smooth',
        renderLineHighlight: 'none',
        renderWhitespace: 'selection',
        renderControlCharacters: false,
        dragAndDrop: true,
        fontSize: 12,
        disableMonospaceOptimizations: false,
        extraEditorClassName: 'scripter-light',
        links: false,
        codeLens: false,
        lightbulb: {
          enabled: false
        },
        quickSuggestions: true,
        quickSuggestionsDelay: 800,
        acceptSuggestionOnEnter: 'smart',
        suggestSelection: 'recentlyUsedByPrefix',
        tabCompletion: 'on',
        hover: {
          enabled: true,
          delay: 1e3
        },
        suggest: {
          localityBonus: true,
          shareSuggestSelections: true,
          hideStatusBar: false
        },
        scrollbar: {
          useShadows: false,
          verticalScrollbarSize: 9,
          verticalSliderSize: 5,
          horizontalScrollbarSize: 9,
          horizontalSliderSize: 5
        },
        minimap: {
          enabled: false
        }
      }
    }
  },

  mounted() {
    this.initEditor()
  },

  methods: {
    initEditor() {
      new abcjs.Editor('editor', {
        canvas_id: 'preview',
        abcjsParams: {
          responsive: 'resize',
        },
      })
    }
  }
}
</script>
