<template>
  <Modal
    dismissible
    title="Delete score"
    @close="$emit('cancel')"
  >
    <div>
      <span class="font-semibold">Are you sure you want to delete {{ score.title }}?</span>
      You can't undo this action.
    </div>

    <div class="flex items-center justify-end space-x-3 mt-8">
      <button
        class="btn btn-default"
        @click="$emit('cancel')"
      >
        Cancel
      </button>

      <button
        class="btn btn-danger"
        @click="$emit('confirm')"
      >
        Delete score
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
  }
}
</script>
