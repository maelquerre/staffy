<template>
  <header class="flex items-center justify-between py-2 px-4 border-b border-gray-200 shadow-sm relative z-10">
    <div class="w-1/4 flex items-center space-x-2">
      <template v-if="isAuthenticated">
        <RouterLink
          class="btn btn-text p-1"
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
      </template>
    </div>

    <div class="w-2/4 text-center text-sm font-medium">
      <template v-if="$route.name === 'score' && score">
        <ScoreHeader
          v-if="isAuthenticated"
        />
        <template v-else>
          {{ score.title }}
        </template>
      </template>

      <template v-else-if="$route.name === 'scores'">
        Recent scores
      </template>

      <template v-else>
        Staffy
      </template>
    </div>

    <div class="w-1/4 flex items-center justify-end">
      <div
        v-if="$route.name === 'score' && isAuthenticated"
        class="flex items-center mr-4 space-x-2"
      >
        <button
          class="btn btn-text p-1"
          :disabled="isUpdatingScore || !score"
          title="Save score"
          @click="handleSaveScore"
        >
          <Spinner
            v-if="isUpdatingScore"
            :size="18"
          />

          <SaveIcon
            v-else
            size="18"
          />
        </button>

        <button
          class="btn btn-text p-1"
          :disabled="!score"
          title="Download score"
          @click="handleDownloadScore"
        >
          <DownloadIcon
            size="18"
          />
        </button>

        <button
          class="btn btn-text p-1"
          :disabled="!score"
          title="Copy link"
          @click="handleCopyLink"
        >
          <LinkIcon
            size="18"
          />
        </button>
      </div>

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
              <div class="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-accent border border-accent-light rounded-full">
                {{ user.name[0] }}
              </div>
            </template>

            <template #items>
              <div class="flex items-center py-1 px-3">
                <div class="flex-shrink-0 flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-accent border border-accent-light rounded-full">
                  {{ user.name[0] }}
                </div>
                <div class="ml-2 text-xs">
                  <div>{{ user.name }}</div>
                  <div class="text-gray-500">{{ user.email }}</div>
                </div>
              </div>

              <RouterLink
                class="dropdown-item"
                :to="{ name: 'general-settings' }"
              >
                Settings
                <SettingsIcon
                  size="16"
                />
              </RouterLink>

              <button
                class="dropdown-item text-red-500"
                @click="handleLogout"
              >
                Log out
                <LogOutIcon
                  size="16"
                />
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

import {
  DownloadIcon,
  LinkIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SaveIcon,
  SettingsIcon,
} from 'vue-feather-icons'
import Dropdown from './Dropdown'
import ScoreHeader from './ScoreHeader'

import withScore from '../mixins/withScore'
import Spinner from './Spinner'

export default {
  components: {
    Dropdown,
    ScoreHeader,
    Spinner,
    DownloadIcon,
    LinkIcon,
    LogOutIcon,
    MenuIcon,
    PlusIcon,
    SaveIcon,
    SettingsIcon,
  },

  mixins: [
    withScore,
  ],

  computed: {
    ...mapState({
      user: state => state.auth.user,
      scoreContent: state => state.score.scoreContent,
      isUpdatingScore: state => state.score.isUpdatingScore,
    }),

    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
      toast: 'alerts/toast',
      downloadScore: 'score/downloadScore',
      updateScore: 'score/updateScore',
    }),

    handleDownloadScore() {
      this.downloadScore({ score: this.score })
    },

    handleCopyLink() {
      let input = document.createElement('input')
      input.value = this.score.link

      // Avoid scrolling to bottom
      input.style.top = '0'
      input.style.left = '0'
      input.style.position = 'fixed'

      document.body.appendChild(input)
      input.focus()
      input.select()

      try {
        const successful = document.execCommand('copy')
        successful && this.toast({ message: 'Score link copied' })
      } catch {
        this.toast({ message: 'There was an error copying the link of this score. Please try again later.' })
      }

      document.body.removeChild(input)
    },

    handleSaveScore() {
      const data = { content: this.scoreContent }
      this.updateScore({ score: this.score, data })
    },

    handleLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' })
      })
    },
  }
}
</script>
