<template>
  <div class="container mx-auto px-4 pt-8">
    <h2 class="mb-8 text-3xl font-bold tracking-tight">Settings</h2>

    <div>
      <div class="flex mb-8 text-sm font-medium border-b">
        <div class="mb-[-1px] pb-3 text-red-500 border-b-2 border-red-500">
          General
        </div>
      </div>

      <div>
        <div class="text-lg font-medium">Profile</div>

        <div
          v-if="user"
          class="divide-y text-sm"
        >
          <div class="flex flex-wrap items-center py-4">
            <div class="w-full sm:w-1/4">
              <div class="font-medium text-gray-500">Name</div>
            </div>
            <div class="w-2/3 sm:w-1/2">
              <input
                v-if="isEditingName"
                v-model="name"
                v-focus
                class="-my-1 -mx-2 py-1 px-2 rounded bg-gray-100 focus:outline-none"
                type="text"
              >
              <template v-else>
                {{ user.name }}
              </template>
            </div>
            <div class="w-1/3 sm:w-1/4 flex justify-end">
              <button
                v-if="!isEditingName"
                class="btn btn-text"
                @click="isEditingName = true"
              >
                Update
              </button>
              <button
                v-else
                class="btn btn-text"
                @click="editName"
              >
                Save
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center py-4">
            <div class="w-full sm:w-1/4">
              <div class="font-medium text-gray-500">Email</div>
            </div>
            <div class="w-2/3 sm:w-1/2">
              <input
                v-if="isEditingEmail"
                v-model="email"
                v-focus
                class="-my-1 -mx-2 py-1 px-2 rounded bg-gray-100 focus:outline-none"
                type="text"
              >
              <template v-else>
                {{ user.email }}
              </template>
            </div>
            <div class="w-1/3 sm:w-1/4 flex justify-end">
              <button
                v-if="!isEditingEmail"
                class="btn btn-text"
                @click="isEditingEmail = true"
              >
                Update
              </button>
              <button
                v-else
                class="btn btn-text"
                @click="editEmail"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div
          v-else
          class="text-sm"
        >
          There was an error. Please try again later.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      isEditingName: false,
      isEditingEmail: false,
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },

  watch: {
    user: {
      immediate: true,
      handler: function (user) {
        if (user) {
          this.name = user.name
          this.email = user.email
        }
      }
    }
  },

  methods: {
    ...mapActions({
      updateUser: 'auth/updateUser',
      toast: 'alerts/toast',
    }),

    editName() {
      if (this.name === this.user.name) {
        this.isEditingName = false
        return
      }

      return this.updateUser({ name: this.name })
        .then(() => {
          this.toast({ message: 'Name updated successfully' })
        })
        .finally(() => {
          this.isEditingName = false
        })
    },

    editEmail() {
      if (this.email === this.user.email) {
        this.isEditingEmail = false
        return
      }

      return this.updateUser({ email: this.email })
        .then(() => {
          this.toast({ message: 'Email updated successfully' })
        })
        .finally(() => {
          this.isEditingEmail = false
        })
    },
  },
}
</script>
