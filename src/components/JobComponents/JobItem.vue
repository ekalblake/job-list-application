<script lang="ts" setup>
import IJob from '@/interfaces/IJob'
import { useJobStore } from '@/stores/jobStore/job'
import { computed } from 'vue'

const props = defineProps<{
  job: IJob
  currentId: number | undefined
}>()

const emit = defineEmits<{
  (event: 'set-job', jobid: number): void
}>()

const jobStore = useJobStore()

const setHTML = computed(() => props.job.description.substring(0, 100).concat('...'))

const salaryParsed = computed(() => {
  if (props.job.salary) {
    return `${props.job.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}/year`
  }
})
</script>
<template>
  <v-card
    v-if="job"
    :border="currentId == job.id ? `opacity-100 sm info` : 'opacity-25 sm'"
    class="my-2"
    :class="currentId == job.id ? 'bg-info' : ''"
    @click="$emit('set-job', job.id)"
  >
    <v-card-item>
      <v-card-title font-weight-bold>
        {{ job.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ job.location }}
      </v-card-subtitle>
      <template v-slot:append>
        {{ job.company }}
      </template>
      <v-card-subtitle class="font-weight-bold text-green-darken-4" v-if="job.salary">
        {{ salaryParsed }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text v-html="setHTML"> </v-card-text>
  </v-card>
</template>
