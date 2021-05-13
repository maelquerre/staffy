<template>
  <div
    class="spinner"
    :class="{
      'spinner-sm': size === 'sm',
      'spinner-md': size === 'md',
      'spinner-lg': size === 'lg',
    }"
    :style="typeof size === 'number' && { '--spinner-size': `${size}px` }"
  >
    <div
      v-for="_ in 12"
      class="blade"
    />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value) || typeof value === 'number',
    },
  },
}
</script>
