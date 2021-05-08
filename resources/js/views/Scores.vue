<template>
  <div
    v-if="scores.length === 0"
    class="flex-grow flex items-center justify-center"
  >
    <div class="flex flex-col items-center">
      <div class="text-center text-sm text-gray-400">
        <div class="font-medium">
          No scores yet
        </div>
        <div class="mt-2">
          Create a new score to start from scratch.
        </div>
      </div>

      <button
        class="btn btn-default flex items-center mt-4"
      >
        <PlusIcon
          class="mr-1"
          size="14"
        />
        New
      </button>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'

export default {
  components: {
    PlusIcon,
  },

  data() {
    return {
      scores: []
    }
  }
}
</script>
