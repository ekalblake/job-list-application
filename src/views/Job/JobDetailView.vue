<script setup lang="ts">
import { useJobStore } from '@/stores/job'
import { computed, onMounted, ref } from 'vue'
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
    <v-card class="text-center">
      <v-card-item>
        <v-card-title> Please select a job. </v-card-title>
      </v-card-item>
      <v-card-text>
        <v-icon size="50" color="error"> mdi-alert-circle </v-icon>
      </v-card-text>
    </v-card>
  </template>
  <template v-else>
    <v-card>
      <JobDetailItem :job="currentJob" />
    </v-card>
  </template>
</template>

<style scoped></style>
