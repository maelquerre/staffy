<template>
  <Modal
    dismissible
    title="Rename score"
    @close="$emit('cancel')"
  >
    <div>
      <input
        v-model="title"
        v-focus
        class="block w-full py-2 px-3 text-sm bg-gray-100 rounded focus:outline-none"
        type="text"
        @keydown.enter="submit"
      >
    </div>

    <div class="flex items-center justify-end space-x-3 mt-8">
      <button
        class="btn btn-primary py-2"
        @click="$emit('cancel')"
      >
        Cancel
      </button>

      <button
        class="btn btn-success py-2"
        @click="submit"
      >
        Rename score
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'

export default {
  components: {
    Modal,
  },

  props: {
    score: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      title: this.score.title
    }
  },

  methods: {
    submit() {
      this.$emit('submit', this.title)
    },
  },
}
</script>
