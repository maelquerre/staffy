<template>
  <div class="flex-grow flex items-center justify-center">
    <div class="text-center">
      <div class="mb-4 text-5xl font-semibold">
        404
      </div>

      <div>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Sorry, this content is not available.',
    }
  }
}
</script>
