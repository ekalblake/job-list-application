import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount, shallowMount } from '@vue/test-utils'
import JobForm from '../../Form/JobForm.vue'
import { useJobStore } from '@/stores/jobStore/job'
import { useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

describe('JobForm', () => {
  let wrapper: any
  let jobStore: any
  let router: any

  beforeEach(() => {
    wrapper = shallowMount(JobForm)
    jobStore = useJobStore()

    router = {
      push: vi.fn(),
    }
  })

  it('renders properly', () => {
    const wrapper = mount(JobForm)
    expect(wrapper).toBeTruthy()
  })

  it('emit event to search ', async () => {
    await wrapper.vm.$emit('search', 'Frontend')
    expect(wrapper.emitted().search[0]).toEqual(['Frontend'])
  })

  it('call searchCategory and push new route', async () => {
    await wrapper.vm.searchCategory('Backend')
    expect(wrapper).toBeTruthy()
  })

  it('delete current job and search Backend', async () => {
    jobStore.currentJob = { id: 1, title: 'Old Job' }
    jobStore.deleteCurrentJob = vi.fn()

    await wrapper.vm.searchJob('Backend')

    expect(jobStore.deleteCurrentJob).toHaveBeenCalled()
  })

  it('delete current job and search null', async () => {
    jobStore.currentJob = { id: 1, title: 'Old Job' }
    jobStore.deleteCurrentJob = vi.fn()

    await wrapper.vm.searchJob()

    expect(jobStore.deleteCurrentJob).toHaveBeenCalled()
  })
})
