<script setup lang="ts">
import { useJobStore } from '@/stores/job'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import JobDetailItem from '@/components/JobComponents/JobDetailItem.vue'

const route = useRoute()

const jobStore = useJobStore()

const currentJob = computed(() => jobStore.currentJob)

const searchQuery = computed(() => route.params.id as string | undefined)

const setCurrentJob = () => {
  jobStore.setCurrentJob(searchQuery.value)
}

onMounted(() => {
  setCurrentJob()
})
</script>

<template>
  <template v-if="!currentJob">
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card :elevation="0" min-width="300" class="text-center pa-4">
        <v-card-item>
          <v-card-title> Please select a job. </v-card-title>
        </v-card-item>
        <v-card-text>
          <v-icon size="50" color="warning"> mdi-alert-circle </v-icon>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  <template v-else>
    <v-card>
      <JobDetailItem :job="currentJob" />
    </v-card>
  </template>
</template>

<style scoped></style>
