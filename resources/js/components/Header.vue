<template>
  <header class="flex items-center justify-between py-2 px-4 border-b border-gray-200 shadow-sm relative z-10">
    <div class="w-1/3 flex items-center space-x-2">
      <button class="btn btn-text p-1">
        <MenuIcon
          size="18"
        />
      </button>

      <button
        class="btn btn-text p-1"
        @click="createScore"
      >
        <PlusIcon
          size="18"
        />
      </button>
    </div>

    <div class="w-1/3 flex justify-center text-sm font-medium">
      <template v-if="$route.name === 'score' && score">
        {{ score.title }}
      </template>

      <template v-else-if="$route.name === 'scores'">
        Recent scores
      </template>

      <template v-else>
        Staffy
      </template>
    </div>

    <div class="w-1/3 flex items-center justify-end space-x-4">
      <button class="btn btn-text p-1">
        <SaveIcon
          size="18"
        />
      </button>

      <div class="flex items-center space-x-4">
        <template v-if="!isAuthenticated">
          <RouterLink
            class="btn btn-default"
            :to="{ name: 'login' }"
          >
            Login
          </RouterLink>

          <RouterLink
            class="btn btn-default"
            :to="{ name: 'register' }"
          >
            Register
          </RouterLink>
        </template>

        <template v-else>
          <Dropdown>
            <template #toggle>
              <div class="flex items-center justify-center w-6 h-6 text-white bg-red-500 border border-red-400 rounded-full">
                {{ user.name[0] }}
              </div>
            </template>

            <template #items>
              <button
                class="w-full flex items-center py-1 px-4 text-left hover:bg-gray-100"
                @click="handleLogout"
              >
                <LogOutIcon
                  class="mr-2"
                  size="14"
                />
                Logout
              </button>
            </template>
          </Dropdown>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import { LogOutIcon, MenuIcon, PlusIcon, SaveIcon } from 'vue-feather-icons'

import withScoreActions from '../mixins/withScoreActions'
import Dropdown from './Dropdown'

export default {
  components: {
    Dropdown,
    LogOutIcon,
    MenuIcon,
    PlusIcon,
    SaveIcon,
  },

  mixins: [
    withScoreActions,
  ],

  computed: {
    ...mapState({
      user: state => state.auth.user,
      score: state => state.score.score,
    }),

    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),

    handleLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' })
      })
    },
  }
}
</script>
