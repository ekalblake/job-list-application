<script setup lang="ts">
import JobForm from '@/components/Form/JobForm.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

import { useJobStore } from '@/stores/job'
import JobItem from '@/components/JobComponents/JobItem.vue'
import LoaderComponent from '@/components/ExtraComponents/LoaderComponent.vue'
import { ROUTE_NAME } from '@/constant'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()

const jobStore = useJobStore()

const route = useRoute()

const router = useRouter()

const isLoading = ref<boolean>(false)

const searchQuery = computed(() => route.query.search as string | undefined)

const categoryQuery = computed(() => route.query.category as string | undefined)

const jobList = computed(() => jobStore.jobList)

const currentJob = computed(() => jobStore.currentJob)

const page = ref<number>(1)

const perPage = ref<number>(7)

const jobDialog = ref<boolean>(false)

const jobDisplayed = computed(() => {
  let from = page.value * perPage.value - perPage.value
  let to = page.value * perPage.value
  return jobList.value.slice(from, to)
})

const numberOfPages = computed(() => {
  if (jobList.value) {
    return Math.ceil(jobList.value!.length / perPage.value)
  }
})

const onMountedJobList = async () => {
  isLoading.value = true
  try {
    if (categoryQuery.value) {
      await jobStore.searchByCategory(categoryQuery.value)
    } else {
      await jobStore.searchByTitle(searchQuery.value)
    }
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const searchByTitle = (title: string) => {
  jobDialog.value = true
  if (!title) {
    router.replace({
      name: ROUTE_NAME.JOB_LIST,
    })
    return
  }
  router.replace({
    name: ROUTE_NAME.JOB_LIST,
    query: { search: title },
  })
}

onMounted(async () => {
  await onMountedJobList()
})

/* onBeforeRouteUpdate(async (to, from) => {
  await onMountedJobList()
}) */
</script>
<template>
  <v-container class="h-100">
    <JobForm @search="searchByTitle" />
    <v-card min-height="500">
      <v-row>
        <v-col cols="12" sm="12" md="5">
          <LoaderComponent v-if="isLoading" :set-min-height="'300'" />
          <template v-else>
            <template v-if="jobList">
              <JobItem
                v-for="job of jobDisplayed"
                :key="job.id"
                :job="job"
                :current-id="currentJob?.id"
              />
              <v-pagination v-model="page" :length="numberOfPages" rounded="circle"> </v-pagination>
            </template>
          </template>
        </v-col>
        <v-col class="d-none d-md-block" cols="12" md="7">
          <RouterView />
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="jobDialog" v-if="mobile">
      <RouterView />
    </v-dialog>
  </v-container>
</template>
