<script setup lang="ts">
import { ROUTE_NAME } from '@/constant'
import { useJobStore } from '@/stores/job'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits<{
  (event: 'search', value: string): void
}>()

const jobStore = useJobStore()

const text = ref<string>('')

const categoryList = ref(['Frontend', 'Backend', 'DevOps', 'FullStack'])

const router = useRouter()

const searchJob = (title: string) => {
  if (jobStore.currentJob) {
    jobStore.deleteCurrentJob()
  }
  if (!title) {
    router.push({ name: ROUTE_NAME.JOB_LIST })
  } else {
    router.push({ name: ROUTE_NAME.JOB_LIST, query: { search: title } })
  }
}

const searchCategory = (event: string) => {
  router.push({ name: ROUTE_NAME.JOB_LIST, query: { category: event } })
}
</script>

<template>
  <v-card>
    <v-card-text class="d-flex align-center justify-center">
      <v-row>
        <v-col cols="12" sm="9" md="9">
          <v-tooltip text="Job title, company name, or location" location="bottom">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-bind="props"
                hide-details
                v-model="text"
                variant="outlined"
                placeholder="Job title..."
                @keyup.enter="searchJob(text)"
              >
                <template v-slot:append-inner>
                  <v-btn variant="outlined" @click="searchJob(text)" hide-details>Search</v-btn>
                </template>
              </v-text-field>
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-select
            variant="outlined"
            :items="categoryList"
            placeholder="Category"
            hide-details
            @update:model-value="searchCategory($event)"
          >
            Category
          </v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
