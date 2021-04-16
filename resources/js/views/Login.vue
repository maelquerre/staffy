<template>
  <div class="w-full max-w-sm">
    <div class="text-center text-4xl font-semibold tracking-tight mb-12">
      Staffy
    </div>

    <div>
      <label>
        <input
          id="username"
          v-model="username"
          class="input"
          placeholder="Username"
          type="text"
        >
      </label>
    </div>

    <div>
      <label>
        <input
          id="password"
          v-model="password"
          class="input"
          placeholder="Password"
          type="password"
        >
      </label>
    </div>

    <div>
      <button
        class="btn btn-primary"
        @click="handleLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
    }),

    handleLogin() {
      const data = {
        username: this.username,
        password: this.username,
      }

      this.login(data)
    },
  },
}
</script>
