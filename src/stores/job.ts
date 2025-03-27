import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { jobService } from '@/services/JobServices'
import IJob from '@/interfaces/IJob'

export const useJobStore = defineStore('job', () => {
  const jobList = ref<IJob[] | null>(null)

  const currentJob = ref<IJob | null>(null)

  const fetchJobList = async () => {
    const response = await jobService.searchJob()
    jobList.value = response
  }

  const searchByTitle = async (name: string) => {
    const response = await jobService.searchByTitle(name)
    jobList.value = response
  }

  return { fetchJobList, searchByTitle, jobList, currentJob }
})
