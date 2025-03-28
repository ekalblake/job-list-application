<script lang="ts" setup>
import IJob from '@/interfaces/IJob'

import { useJobStore } from '@/stores/jobStore/job'
import { computed, ref } from 'vue'
import SubmitForm from '../Form/SubmitForm.vue'

const jobStore = useJobStore()

const job = computed<IJob>(() => jobStore.currentJob)

const formDialog = ref<boolean>(false)

const salaryParsed = computed(() => {
  if (job.value.salary) {
    return `${job.value.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}/year`
  }
})

const applyNow = () => {
  jobStore.updateApplied(job.value.id)

  alert('You have applied for this job!')
  formDialog.value = !formDialog.value
}
</script>
<template>
  <v-container v-if="!job" class="fill-height d-flex align-center justify-center">
    <v-card :elevation="0" min-width="300" class="text-center pa-4">
      <v-card-item>
        <v-card-title> Please select a job. </v-card-title>
        <v-icon color="warning"> mdi-alert-circle </v-icon>
      </v-card-item>
    </v-card>
  </v-container>
  <v-card class="overflow-auto" v-else>
    <v-card-item>
      <v-card-title>
        {{ job.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ job.company }}
      </v-card-subtitle>
      <v-card-subtitle>
        {{ job.location }}
      </v-card-subtitle>
      <template v-slot:append>
        <slot></slot>
      </template>
    </v-card-item>
    <v-card-text v-if="job.salary" class="text-green-darken-3 font-weight-bold text-h6">
      {{ salaryParsed }}
    </v-card-text>
    <slot name="detail"></slot>
    <v-card-text>
      <p class="text-h6">About the job</p>
      <p class="text-body-1" v-html="job.description"></p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        :disabled="job.applied"
        color="primary"
        variant="elevated"
        @click="formDialog = !formDialog"
      >
        Apply now
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="formDialog" max-width="600px">
    <SubmitForm @submit-form="applyNow" @close-form="formDialog = !formDialog" />
  </v-dialog>
</template>

<style scoped></style>
