<template>
  <div
    v-if="isFetchingScores || scores.length > 0"
    class="flex-grow p-4 sm:p-8"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
      <template v-if="isFetchingScores">
        <div
          v-for="_ in 4"
          class="py-3 px-3 bg-white border border-gray-200 rounded-md shadow-sm "
        >
          <div class="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div class="h-3 w-1/2 bg-gray-200 rounded animate-pulse mt-2" />
        </div>
      </template>

      <template v-else>
        <RouterLink
          v-for="score in scores"
          :key="score.id"
          class="group flex items-start justify-between py-2 px-3 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
          :to="{ name: 'score', params: { hash: score.hash } }"
        >
          <div>
            <div class="text-sm font-medium">{{ score.title }}</div>
            <div class="mt-1 text-xs text-gray-400">Created {{ score.created_at | date }}</div>
          </div>

          <Dropdown>
            <template #toggle="{ isOpen }">
              <button
                class="btn btn-default p-1 rounded-full"
                :class="{ 'opacity-0 group-hover:opacity-100': !isOpen }"
              >
                <MoreHorizontalIcon
                  size="16"
                />
              </button>
            </template>

            <template #items>
              <button
                class="dropdown-item"
                @click.prevent="requestScoreRenaming(score)"
              >
                Rename
                <Edit2Icon
                  size="15"
                />
              </button>

              <button
                class="dropdown-item"
                @click.prevent="requestScoreDeletion(score)"
              >
                Delete
                <Trash2Icon
                  size="15"
                />
              </button>
            </template>
          </Dropdown>
        </RouterLink>
      </template>
    </div>

    <DeleteScoreModal
      v-if="isDeleteScoreModalOpen"
      :score="scoreToDelete"
      @cancel="cancelScoreDeletion"
      @confirm="handleScoreDeletion"
    />

    <RenameScoreModal
      v-if="isRenameScoreModalOpen"
      :score="scoreToRename"
      @cancel="cancelScoreRenaming"
      @submit="handleScoreRenaming"
    />
  </div>

  <div
    v-else
    class="flex-grow flex items-center justify-center"
  >
    <div class="flex flex-col items-center">
      <div class="text-center text-sm text-gray-400">
        <div class="font-medium">
          No scores yet
        </div>
        <div class="mt-2">
          Create a new score to start from scratch.
        </div>
      </div>

      <button
        class="btn btn-default flex items-center mt-4"
        @click="createScore"
      >
        <PlusIcon
          class="mr-1"
          size="14"
        />
        New
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { Edit2Icon, MoreHorizontalIcon, PlusIcon, Trash2Icon } from 'vue-feather-icons'
import DeleteScoreModal from '../components/modals/DeleteScoreModal'
import Dropdown from '../components/Dropdown'
import RenameScoreModal from '../components/modals/RenameScoreModal'

import withScore from '../mixins/withScore'

export default {
  components: {
    DeleteScoreModal,
    Dropdown,
    Edit2Icon,
    MoreHorizontalIcon,
    PlusIcon,
    RenameScoreModal,
    Trash2Icon,
  },

  mixins: [
    withScore,
  ],

  data() {
    return {
      isDeleteScoreModalOpen: false,
      isRenameScoreModalOpen: false,
      scoreToDelete: null,
      scoreToRename: null,
    }
  },

  computed: {
    ...mapState('score', {
      scores: 'scores',
      isFetchingScores: 'isFetchingScores',
    }),
  },

  created() {
    this.fetchScores()
      .catch((response) => {
        console.log(response)
      })
  },

  methods: {
    ...mapActions('score', {
      fetchScores: 'fetchScores',
      updateScore: 'updateScore',
      deleteScore: 'deleteScore',
    }),

    requestScoreRenaming(score) {
      this.scoreToRename = score
      this.isRenameScoreModalOpen = true
    },

    cancelScoreRenaming() {
      this.scoreToRename = null
      this.isRenameScoreModalOpen = false
    },

    handleScoreRenaming(title) {
      const data = { title }
      this.updateScore({ score: this.scoreToRename, data })
      this.isRenameScoreModalOpen = false
    },

    requestScoreDeletion(score) {
      this.scoreToDelete = score
      this.isDeleteScoreModalOpen = true
    },

    cancelScoreDeletion() {
      this.scoreToDelete = null
      this.isDeleteScoreModalOpen = false
    },

    handleScoreDeletion() {
      this.deleteScore({ score: this.scoreToDelete })
      this.isDeleteScoreModalOpen = false
    },
  }
}
</script>
