<script setup lang="ts">
import JobForm from '@/components/Form/JobForm.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useJobStore } from '@/stores/jobStore/job'
import JobItem from '@/components/JobComponents/JobItem.vue'
import LoaderComponent from '@/components/ExtraComponents/LoaderComponent.vue'
import { ROUTE_NAME } from '@/constant'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import JobDetailView from './JobDetailView.vue'
import JobDetailItem from '@/components/JobComponents/JobDetailItem.vue'

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

const perPage = ref<number>(5)

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

const setJob = (jobid: number) => {
  jobStore.setCurrentJob(jobid.toString())
}

const onMountedJobList = async () => {
  if (route.params.id) {
    return
  }

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
  jobStore.searchByTitle(title)
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
</script>
<template>
  <v-container class="h-100">
    <JobForm @search="searchByTitle" />
    <v-card class="fill-height my-2" min-height="500">
      <v-row>
        <v-col cols="12" sm="12" md="5">
          <LoaderComponent v-if="isLoading" :set-min-height="'300'">
            <h4>Looking for jobs...</h4>
          </LoaderComponent>
          <template v-else>
            <template v-if="jobList && jobList.length > 0">
              <JobItem
                @click="jobDialog = !jobDialog"
                v-for="job of jobDisplayed"
                :key="job.id"
                :job="job"
                @set-job="setJob"
                :current-id="currentJob?.id"
              />
              <v-pagination v-model="page" :length="numberOfPages" rounded="circle"> </v-pagination>
            </template>
            <template v-else>
              <v-card class="fill-height d-flex align-center justify-center">
                <v-card :elevation="0" min-width="300" class="text-center pa-4">
                  <v-card-item>
                    <v-card-title> No jobs found. <br />Try another search </v-card-title>
                  </v-card-item>
                  <v-card-text>
                    <v-icon size="50" color="warning"> mdi-alert-circle </v-icon>
                  </v-card-text>
                </v-card>
              </v-card>
            </template>
          </template>
        </v-col>
        <v-col class="d-none d-md-block" cols="12" md="7">
          <JobDetailItem>
            <template #detail>
              <v-card-text>
                <v-btn
                  @click="
                    $router.push({ name: ROUTE_NAME.JOB_DETAIL, params: { id: currentJob?.id } })
                  "
                  variant="elevated"
                  color="success"
                >
                  View details
                </v-btn>
              </v-card-text>
            </template>
            <v-btn icon variant="outlined" color="success" @click="jobStore.deleteCurrentJob()">
              <v-icon> mdi-close</v-icon>
            </v-btn>
          </JobDetailItem>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog class="overflow-auto" v-if="mobile" v-model="jobDialog">
      <JobDetailView />
    </v-dialog>
  </v-container>
</template>
