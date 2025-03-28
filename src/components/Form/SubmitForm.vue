<script setup lang="ts">
import { ref } from 'vue'

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const fieldRules = [(v: string) => !!v || 'Field is required']

const form = ref<null | HTMLFormElement>(null)

const emit = defineEmits<{
  (event: 'submit-form'): void
  (event: 'close-form'): void
}>()

const submitForm = async () => {
  const { valid } = await form.value?.validate()

  if (!valid) {
    alert('Please fill in the form')
  } else {
    emit('submit-form')
  }
}
</script>
<template>
  <v-card>
    <v-card-item>
      <v-card-title>Apply for this job</v-card-title>
      <v-card-subtitle>Send your information to the company</v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-form ref="form">
        <v-text-field :rules="fieldRules" label="Full name" required></v-text-field>
        <v-text-field :rules="emailRules" label="Email" required></v-text-field>
        <v-text-field label="Phone number" required></v-text-field>
        <v-textarea label="Cover letter" required></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text @click="submitForm">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
