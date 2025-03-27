<script setup lang="ts">
import JobForm from '@/components/Form/JobForm.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useJobStore } from '@/stores/job'

const jobStore = useJobStore()

const route = useRoute()

const onMountedJobList = async () => {
  try {
    const searchValue: any = route.query.search
    console.log(searchValue)
    if (!searchValue) {
      jobStore.fetchJobList()
    } else {
      jobStore.searchByTitle(searchValue)
    }
  } catch (err) {
    console.log(err)
  }
}

const searchByTitle = (title: string) => {
  jobStore.searchByTitle(title)
}

onMounted(async () => {
  await onMountedJobList()
})
</script>

<template>
  <v-container fluid>
    <JobForm @search="searchByTitle" />
    <v-card>
      <RouterView :key="$route.fullPath" />
    </v-card>
  </v-container>
</template>
