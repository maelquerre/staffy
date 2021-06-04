<template>
  <div>
    <div class="text-lg font-medium">
      Change your password
    </div>

    <div class="max-w-xs pt-6 space-y-6 text-sm">
      <div>
        <label
          class="inline-block mb-1 font-medium"
          for="currentPassword"
        >
          Current password
        </label>
        <input
          id="currentPassword"
          v-model="currentPassword"
          class="input-text"
          type="password"
          @keydown.enter="handleUpdatePassword"
        >

        <div
          v-if="errors['current_password']"
          class="mt-2 ml-1 space-y-3 text-xs text-red-500"
        >
          <div v-for="error in errors['current_password']">
            {{ error }}
          </div>
        </div>
      </div>

      <div>
        <label
          class="inline-block mb-1 font-medium"
          for="newPassword"
        >
          New password
        </label>
        <input
          id="newPassword"
          v-model="newPassword"
          class="input-text"
          type="password"
          @keydown.enter="handleUpdatePassword"
        >

        <div
          v-if="errors['new_password']"
          class="mt-2 ml-1 space-y-3 text-xs text-red-500"
        >
          <div v-for="error in errors['new_password']">
            {{ error }}
          </div>
        </div>
      </div>

      <div>
        <label
          class="inline-block mb-1 font-medium"
          for="newPasswordConfirmation"
        >
          Confirm new password
        </label>
        <input
          id="newPasswordConfirmation"
          v-model="newPasswordConfirmation"
          class="input-text"
          type="password"
          @keydown.enter="handleUpdatePassword"
        >
      </div>
    </div>

    <button
      class="mt-6 btn btn-default"
      @click="handleUpdatePassword"
    >
      Change password
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      errors: {},
    }
  },

  methods: {
    ...mapActions({
      updatePassword: 'auth/updatePassword',
      toast: 'alerts/toast',
    }),

    handleUpdatePassword() {
      this.updatePassword({
        current_password: this.currentPassword,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirmation,
      })
        .then(() => {
          this.toast({ message: 'Password updated successfully' })

          this.currentPassword = ''
          this.newPassword = ''
          this.newPasswordConfirmation = ''
          this.errors = {}
        })
        .catch(({ response }) => {
          if (response.data.errors) {
            this.errors = response.data.errors
          } else {
            this.toast({ message: 'There was an error updating your password. Please try again later.' })
          }

          this.newPasswordConfirmation = ''
        })
    },
  }
}
</script>
