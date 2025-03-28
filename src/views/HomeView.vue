<script setup lang="ts">
import JobForm from '@/components/Form/JobForm.vue'
</script>

<template>
  <v-container class="h-100 justify-center align-content-center w-50">
    <v-card class="text-center">
      <v-card-item>
        <v-card-title> Welcome to <span class="font-weight-bold">FindJobEasy</span> </v-card-title>
        <v-card-subtitle>
          A place where you will find a
          <strong>job</strong> in a blink of an
          <strong>eye</strong>
        </v-card-subtitle>
      </v-card-item>
    </v-card>
    <JobForm />
  </v-container>
</template>
