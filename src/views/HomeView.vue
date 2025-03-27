<script setup lang="ts">
import JobForm from '@/components/Form/JobForm.vue'
import { ROUTE_NAME } from '@/constant'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchJob = (title: string) => {
  if (!title) {
    router.push({ name: ROUTE_NAME.JOB_LIST })
  } else {
    router.push({ name: ROUTE_NAME.JOB_LIST, query: { search: title } })
  }
}
</script>

<template>
  <v-container class="h-100 justify-center align-content-center w-50" fluid>
    <v-card class="text-center">
      <v-card-title> Welcome to <span class="font-weight-bold">FindJobEasy</span> </v-card-title>
    </v-card>
    <v-tooltip text="Job title, company name, or location" location="bottom">
      <template v-slot:activator="{ props }">
        <JobForm v-bind="props" @search="searchJob" />
      </template>
    </v-tooltip>
  </v-container>
</template>
