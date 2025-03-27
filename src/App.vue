<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar app>
      <template v-slot:prepend>
        <v-img width="50" src="@/assets/logo.svg"></v-img>
      </template>
      <v-tabs>
        <v-tab to="/"> Home </v-tab>
        <v-tab to="/job-list"> Search for a job </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <RouterView :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<style scoped></style>
