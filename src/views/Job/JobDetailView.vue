<script lang="ts">
import { useJobStore } from '@/stores/jobStore/job'
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import JobDetailItem from '@/components/JobComponents/JobDetailItem.vue'

import IJob from '@/interfaces/IJob'
import LoaderComponent from '@/components/ExtraComponents/LoaderComponent.vue'
import JobForm from '@/components/Form/JobForm.vue'
import JobItem from '@/components/JobComponents/JobItem.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ROUTE_NAME } from '@/constant'

export default defineComponent({
  components: { JobDetailItem, LoaderComponent, JobForm, JobItem },
  setup() {
    const { mobile } = useDisplay()
    const route = useRoute()
    const router = useRouter()
    const jobStore = useJobStore()
    const isLoading = ref<boolean>(true)

    const currentJob = computed<IJob>(() => jobStore.currentJob)
    const searchParam = computed<string | undefined>(() => route.params.id as string | undefined)

    const similarList = ref<IJob[] | null>(null)

    const getSimilarCategories = async () => {
      const response = await jobStore.searchByCategoryJob(currentJob.value.category)
      similarList.value = response
    }

    const setJob = (jobid: number) => {
      router.push({
        name: ROUTE_NAME.JOB_DETAIL,
        params: {
          id: jobid,
        },
      })
    }

    onMounted(async () => {
      if (searchParam) {
        await jobStore.loadCurrentJob(searchParam.value)
        isLoading.value = false
      }
      getSimilarCategories()
    })

    return { setJob, currentJob, isLoading, similarList, mobile }
  },
})
</script>

<template>
  <v-container>
    <JobForm v-if="!mobile" />
    <v-card class="h-100">
      <v-row>
        <v-col v-if="isLoading" cols="12" md="9">
          <LoaderComponent :set-min-height="'500'">
            <h4>Looking for offer...</h4>
          </LoaderComponent>
        </v-col>
        <v-col v-else cols="12" md="9">
          <JobDetailItem />
        </v-col>
        <v-col v-if="!mobile" cols="12" md="3">
          <v-card-title>Similar Jobs</v-card-title>
          <template v-for="job of similarList">
            <JobItem :job="job" :current-id="currentJob.id" @set-job="setJob" />
          </template>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
