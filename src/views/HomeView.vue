<script setup lang="ts">
import JobForm from '@/components/Form/JobForm.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()
</script>

<template>
  <v-container class="h-100 justify-center align-content-center" :class="mobile ? 'w-100' : 'w-50'">
    <v-card border="opacity-50 sm" class="text-center">
      <v-card-item>
        <v-card-title>
          Welcome to <span class="font-weight-bold">FindJobs<strong>EZ</strong></span>
        </v-card-title>
        <v-card-subtitle>
          A place where you will find the perfect
          <strong>job</strong> in a blink of an
          <strong>eye</strong>
        </v-card-subtitle>
      </v-card-item>
      <JobForm />
    </v-card>
  </v-container>
</template>
