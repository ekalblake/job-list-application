<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationComponent from '@/components/ExtraComponents/NavigationComponent.vue'
</script>

<template>
  <v-app>
    <v-main>
      <NavigationComponent />
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>
