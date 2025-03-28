<template>
  <v-card class="loading-center h-100" :style="{ 'min-height': setMinHeight }">
    <v-progress-circular indeterminate color="black"> </v-progress-circular>
    <slot></slot>
  </v-card>
</template>
<script setup lang="ts">
defineProps<{
  setMinHeight: string
}>()
</script>
<style scoped>
.loading-center {
  width: 100%;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 10px;
}
</style>
