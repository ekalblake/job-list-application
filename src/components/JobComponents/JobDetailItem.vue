<script lang="ts" setup>
import IJob from '@/interfaces/IJob'

import { useJobStore } from '@/stores/job'
import { computed, ref } from 'vue'
import SubmitForm from '../Form/SubmitForm.vue'

const props = defineProps<{
  job: IJob
}>()

const jobStore = useJobStore()

const formDialog = ref<boolean>(false)

const salaryParsed = computed(() => {
  if (props.job.salary) {
    return `${props.job.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}/year`
  }
})

const applyNow = () => {
  jobStore.updateApplied(props.job.id)

  alert('You have applied for this job!')
  formDialog.value = !formDialog.value
}
</script>
<template>
  <v-card class="overflow-auto" v-if="job">
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
        <v-btn icon variant="outlined" color="success" @click="jobStore.deleteCurrentJob()">
          <v-icon> mdi-close</v-icon>
        </v-btn>
      </template>
    </v-card-item>
    <v-card-text v-if="job.salary" class="text-green-darken-3 font-weight-bold text-h6">
      {{ salaryParsed }}
    </v-card-text>
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
