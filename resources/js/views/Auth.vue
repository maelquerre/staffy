<template>
  <div class="flex-grow flex items-center justify-center">
    <div class="w-full max-w-sm px-4">
      <div class="flex items-center justify-center mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">
        <img
          alt=""
          class="w-10 mr-4"
          src="/images/logo.png"
        >

        {{ isLoginShown ? 'Log in' : 'Sign up' }} to Staffy
      </div>

      <Login
        v-if="isLoginShown"
      />
      <Register
        v-else
      />

      <div class="mt-6 text-sm text-center">
        <template v-if="isLoginShown">
          Don't have an account?
          <RouterLink
            class="text-red-500 underline"
            :to="{ name: 'register' }"
          >
            Sign up
          </RouterLink>
        </template>

        <template v-else>
          Already registered?
          <RouterLink
            class="text-red-500 underline"
            :to="{ name: 'login' }"
          >
            Log in
          </RouterLink>
        </template>
      </div>
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
