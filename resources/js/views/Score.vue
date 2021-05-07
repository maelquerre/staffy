<template>
  <div class="flex-grow flex flex-col">
    <div class="flex-grow flex">
      <div class="w-1/2 relative">
        <Editor
          class="absolute inset-0"
          canvasId="preview"
          :value="scoreContent"
          @change="scoreContent = $event"
        />
      </div>

      <div class="w-1/2 p-4 bg-gray-100">
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
    const scoreContent = score.content

    return {
      scoreContent,
    }
  },

  methods: {
    handle(event) {
      console.log(event)
    }
  }
}
</script>
