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
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      <RouterLink
        v-for="score in scores"
        :key="score.id"
        class="group flex items-start justify-between p-2 text-sm bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
        :to="{ name: 'score', params: { hash: score.hash } }"
      >
        <div>
          <div class="font-medium">{{ score.title }}</div>
          <div class="mt-1 text-xs text-gray-400">Created {{ score.created_at | date }}</div>
        </div>

        <div class="flex space-x-2 opacity-0 group-hover:opacity-100">
          <button
            class="btn btn-primary p-1"
            @click.prevent
          >
            <Edit2Icon
              size="14"
            />
          </button>

          <button
            class="btn btn-danger p-1"
            @click.prevent="handleDeleteScore(score.id)"
          >
            <Trash2Icon
              size="14"
            />
          </button>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { Edit2Icon, PlusIcon, Trash2Icon } from 'vue-feather-icons'

import withScoreActions from '../mixins/withScoreActions'

export default {
  components: {
    Edit2Icon,
    PlusIcon,
    Trash2Icon,
  },

  mixins: [
    withScoreActions,
  ],

  computed: {
    ...mapState({
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
    }),

    handleDeleteScore(scoreId) {

    }
  }
}
</script>
