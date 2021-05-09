<template>
  <div>
    <div
      v-if="errors['global']"
      class="mb-2 ml-1 space-y-3 text-xs text-red-500"
    >
      <div v-for="error in errors['global']">
        {{ error }}
      </div>
    </div>

    <div>
      <label>
        <input
          id="name"
          v-model="name"
          class="input"
          placeholder="Name"
          type="text"
        >
      </label>

      <div
        v-if="errors['name']"
        class="mt-2 ml-1 space-y-3 text-xs text-red-500"
      >
        <div v-for="error in errors['name']">
          {{ error }}
        </div>
      </div>
    </div>

    <div class="mt-4">
      <label>
        <input
          id="email"
          v-model="email"
          class="input"
          placeholder="Email address"
          type="email"
        >
      </label>

      <div
        v-if="errors['email']"
        class="mt-2 ml-1 space-y-3 text-xs text-red-500"
      >
        <div v-for="error in errors['email']">
          {{ error }}
        </div>
      </div>
    </div>

    <div class="mt-4">
      <label>
        <input
          id="password"
          v-model="password"
          class="input"
          placeholder="Password"
          type="password"
        >
      </label>

      <div
        v-if="errors['password']"
        class="mt-2 ml-1 space-y-3 text-xs text-red-500"
      >
        <div v-for="error in errors['password']">
          {{ error }}
        </div>
      </div>
    </div>

    <div>
      <button
        class="btn btn-default text-sm w-full mt-6 py-2 px-3"
        @click="handleRegister"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import withAuthentication from '../../mixins/withAuthentication'

export default {
  mixins: [
    withAuthentication,
  ],

  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },

  methods: {
    ...mapActions({
      register: 'auth/register',
    }),

    handleRegister() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      this.register(data)
        .then(this.onAuthenticationSuccess)
        .catch(this.onAuthenticationError)
    },
  },
}
</script>
