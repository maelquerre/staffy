<template>
  <div
    v-if="scores.length === 0"
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

  <div
    v-else
    class="flex-grow p-8"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      <RouterLink
        v-for="score in scores"
        :key="score.id"
        class="group flex items-start justify-between py-2 px-3 text-sm bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
        :to="{ name: 'score', params: { hash: score.hash } }"
      >
        <div>
          <div class="font-medium">{{ score.title }}</div>
          <div class="mt-1 text-xs text-gray-400">Created {{ score.created_at | date }}</div>
        </div>

        <Dropdown>
          <template #toggle="{ isOpen }">
            <button
              class="btn btn-default p-1"
              :class="{ 'opacity-0 group-hover:opacity-100': !isOpen }"
            >
              <MoreHorizontalIcon
                size="16"
              />
            </button>
          </template>

          <template #items>
            <button
              class="flex items-center w-full py-2 px-4 text-left text-xs hover:bg-gray-100 focus:bg-gray-100"
              @click.prevent="requestScoreRenaming(score)"
            >
              <Edit2Icon
                class="mr-2"
                size="14"
              />
              Edit
            </button>

            <button
              class="flex items-center w-full py-2 px-4 text-left text-xs hover:bg-gray-100 focus:bg-gray-100"
              @click.prevent="requestScoreDeletion(score)"
            >
              <Trash2Icon
                class="mr-2"
                size="14"
              />
              Delete
            </button>
          </template>
        </Dropdown>
      </RouterLink>
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
    ...mapState({
      score: state => state.score.score,
      scores: state => state.score.scores,
    }),
  },

  created() {
    this.fetchScores()
      .catch((response) => {
        console.log(response)
      })
  },

  methods: {
    ...mapActions({
      fetchScores: 'score/fetchScores',
      updateScore: 'score/updateScore',
      deleteScore: 'score/deleteScore',
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
