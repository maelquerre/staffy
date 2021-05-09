<template>
  <header class="flex items-center justify-between py-2 px-4 border-b border-gray-200 shadow-sm relative z-10">
    <div class="w-1/3 flex items-center space-x-2">
      <RouterLink
        class="btn btn-text p-1 cursor-default"
        title="Show scores"
        :to="{ name: 'scores' }"
      >
        <MenuIcon
          size="18"
        />
      </RouterLink>

      <button
        class="btn btn-text p-1"
        title="New score"
        @click="createScore"
      >
        <PlusIcon
          size="18"
        />
      </button>
    </div>

    <div class="w-1/3 text-center text-sm font-medium">
      <ScoreHeader
        v-if="$route.name === 'score' && score"
        :score="score"
      >
        {{ score.title }}
      </ScoreHeader>

      <template v-else-if="$route.name === 'scores'">
        Recent scores
      </template>

      <template v-else>
        Staffy
      </template>
    </div>

    <div class="w-1/3 flex items-center justify-end space-x-4">
      <button
        v-if="$route.name === 'score'"
        class="btn btn-text p-1"
        @click="handleSaveScore"
      >
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
              <div class="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-red-500 border border-red-400 rounded-full">
                {{ user.name[0] }}
              </div>
            </template>

            <template #items>
              <div class="flex items-center py-2 px-4">
                <div class="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-red-500 border border-red-400 rounded-full">
                  {{ user.name[0] }}
                </div>
                <div class="ml-2 text-xs">
                  <div>{{ user.email }}</div>
                  <div class="text-gray-500">@{{ user.name }}</div>
                </div>
              </div>

              <button
                class="flex items-center w-full py-2 px-4 text-left text-xs hover:bg-gray-100 focus:bg-gray-100"
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
import Dropdown from './Dropdown'
import ScoreHeader from './ScoreHeader'

import withScore from '../mixins/withScore'

export default {
  components: {
    ScoreHeader,
    Dropdown,
    LogOutIcon,
    MenuIcon,
    PlusIcon,
    SaveIcon,
  },

  mixins: [
    withScore,
  ],

  computed: {
    ...mapState({
      user: state => state.auth.user,
      scoreContent: state => state.score.scoreContent,
    }),

    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
      saveScore: 'score/saveScore',
    }),

    handleSaveScore() {
      const data = { content: this.scoreContent }
      this.saveScore(data)
    },

    handleLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' })
      })
    },
  }
}
</script>
