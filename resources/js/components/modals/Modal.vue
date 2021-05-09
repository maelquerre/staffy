<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <!-- Background overlay -->
        <div
          v-if="isMounted"
          aria-hidden="true"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="$emit('close')"
        />
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="isMounted"
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="text-xs bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div
              v-if="title || dismissible"
              class="flex items-start mb-4"
            >
              <div
                v-if="title"
                class="text-sm"
              >
                {{ title }}
              </div>

              <button
                v-if="dismissible"
                class="btn btn-text ml-auto -mt-2 -mr-2 p-2"
                @click="$emit('close')"
              >
                <XIcon
                  size="18"
                />
              </button>
            </div>

            <slot />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'

export default {
  components: {
    XIcon,
  },

  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isMounted: false,
    }
  },

  mounted() {
    this.isMounted = true
  },
}
</script>
