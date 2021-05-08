<template>
  <header class="flex items-center justify-between py-2 px-4 border-b border-gray-200 shadow-sm relative z-10">
    <div class="w-1/3 flex items-center space-x-2">
      <button class="btn btn-text p-1">
        <MenuIcon
          size="18"
        />
      </button>

      <button class="btn btn-text p-1">
        <PlusIcon
          size="18"
        />
      </button>
    </div>

    <div class="w-1/3 flex justify-center font-semibold">
      Staffy
    </div>

    <div class="w-1/3 flex items-center justify-end space-x-4">
      <button class="btn btn-text p-1">
        <SaveIcon
          size="18"
        />
      </button>

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

          <template v-else>
            <li>
              <button
                class="btn btn-default"
                @click="handleLogout"
              >
                Logout
              </button>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import { MenuIcon, PlusIcon, SaveIcon } from 'vue-feather-icons'

export default {
  components: {
    MenuIcon,
    PlusIcon,
    SaveIcon,
  },

  computed: {
    ...mapState('auth', [
      'user',
    ]),

    ...mapGetters('auth', [
      'isAuthenticated'
    ]),
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),

    handleLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>
