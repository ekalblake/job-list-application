<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <v-container class="text-center h-100">
    <v-row justify="center" class="fill-height">
      <v-col class="h-100 align-center content-center" cols="12">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <v-btn color="primary" @click="goHome">Go to Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.content-center {
  width: 100%;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 10px;
}
</style>
