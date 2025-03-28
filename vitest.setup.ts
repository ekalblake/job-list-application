import { beforeAll } from 'vitest'
import { createVuetify } from 'vuetify'
import { config } from '@vue/test-utils'
import 'vuetify/styles'
import { createPinia, setActivePinia } from 'pinia'

const vuetify = createVuetify()

beforeAll(() => {
  config.global.plugins = [vuetify]
  const pinia = createPinia()
  setActivePinia(pinia)
})
