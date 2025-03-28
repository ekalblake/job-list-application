<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <v-app-bar app>
    <template v-slot:prepend>
      <RouterLink class="d-none d-md-block" to="/">
        <v-img width="50" src="@/assets/logo.svg"></v-img>
      </RouterLink>
    </template>
    <v-tabs>
      <v-tab to="/"> Home </v-tab>
      <v-tab to="/job-list"> Search for a job </v-tab>
    </v-tabs>
  </v-app-bar>
</template>
