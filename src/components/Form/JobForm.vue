<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'search', value: string): void
}>()

const text = ref<string>('')

const jobForm = ref<HTMLFormElement | null>(null)

const requiredForm = (value: string) => !!value || 'Job title is required'

const searchJob = async () => {
  emit('search', text.value)
}
</script>

<template>
  <v-card>
    <v-card-text class="d-flex align-center justify-center">
      <v-text-field
        :rules="[requiredForm]"
        v-model="text"
        variant="outlined"
        placeholder="Job title..."
        @keyup.enter="searchJob"
      >
        <template v-slot:append-inner>
          <v-btn @click="searchJob" hide-details>Search</v-btn>
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>
