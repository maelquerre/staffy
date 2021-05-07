<template>
  <header class="flex items-center justify-between py-2 px-4">
    <div class="text-lg font-semibold">
      Staffy
    </div>

    <nav>
      <ul class="flex items-center space-x-4">
        <template v-if="!isAuthenticated">
          <li>
            <RouterLink
              class="btn btn-default"
              :to="{ name: 'login' }"
            >
              Login
            </RouterLink>
          </li>

          <li>
            <RouterLink
              class="btn btn-default"
              :to="{ name: 'register' }"
            >
              Register
            </RouterLink>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated'
    ]),
  }
}
</script>
