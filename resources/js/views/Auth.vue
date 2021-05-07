<template>
  <div class="w-full max-w-sm">
    <div class="text-center text-4xl font-semibold tracking-tight mb-12">
      {{ isLoginShown ? 'Login' : 'Register' }} to Staffy
    </div>

    <Login
      v-if="isLoginShown"
    />
    <Register
      v-else
    />

    <div v-if="isLoginShown">
      Don't have an account?
      <RouterLink
        class="text-blue-500 underline"
        :to="{ name: 'register' }"
      >
        Register
      </RouterLink>
    </div>
    <div v-else>
      Already registered?
      <RouterLink
        class="text-blue-500 underline"
        :to="{ name: 'login' }"
      >
        Login
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

export default {
  components: {
    Login,
    Register,
  },

  props: {
    isLoginShown: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
