<template>
  <div
    v-click-outside="close"
    class="relative inline-block text-left text-sm"
  >
    <span
      class="inline-block cursor-pointer"
      @click.prevent="isOpen = !isOpen"
    >
      <slot
        name="toggle"
        :isOpen="isOpen"
      />
    </span>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        aria-labelledby="menu-button"
        aria-orientation="vertical"
        class="dropdown origin-top-right absolute right-0 mt-1 focus:outline-none"
        role="menu"
        tabindex="-1"
      >
        <div role="none">
          <slot name="items" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    close() {
      if (this.isOpen) {
        this.isOpen = false
      }
    },
  },
}
</script>
