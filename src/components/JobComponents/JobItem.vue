<script lang="ts" setup>
import { ROUTE_NAME } from '@/constant'
import IJob from '@/interfaces/IJob'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  job: IJob
  currentId: number | undefined
}>()

const setHTML = computed(() => props.job.description.substring(0, 100).concat('...'))

const salaryParsed = computed(() => {
  if (props.job.salary) {
    return props.job.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }
})

const setCurrentJob = (job: IJob) => {
  router.replace({
    name: ROUTE_NAME.JOB_DETAIL,
    params: { id: job.id.toString() },
  })
}
</script>
<template>
  <v-card
    v-if="job"
    :border="currentId == job.id ? `opacity-100 sm info` : 'opacity-25 sm'"
    class="my-2 opacity-100 active"
    @click="setCurrentJob(job)"
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
      <v-card-subtitle class="font-weight-bold text-green-darken-3" v-if="job.salary">
        {{ salaryParsed }} / year
      </v-card-subtitle>
    </v-card-item>
    <v-card-text v-html="setHTML"> </v-card-text>
  </v-card>
</template>
