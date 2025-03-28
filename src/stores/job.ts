import { ref } from 'vue'
import { defineStore } from 'pinia'
import { jobService } from '@/services/JobServices'
import IJob from '@/interfaces/IJob'

export const useJobStore = defineStore('job', () => {
  const jobList = ref<IJob[] | null>(null)

  const currentJob = ref<IJob | null>(null)

  const searchByTitle = async (name: string) => {
    if (!name) {
      const response = await jobService.searchJob()
      jobList.value = response
    } else {
      const response = await jobService.searchByTitle(name)
      jobList.value = response
    }
  }

  const searchByCategory = async (category: string) => {
    if (!category) {
      const response = await jobService.searchJob()
      jobList.value = response
    } else {
      const response = await jobService.searchByCategory(category)
      jobList.value = response
    }
  }

  const setCurrentJob = async (jobid: string | undefined) => {
    if (!jobid) return
    const findJob = jobList.value?.find((item) => item.id == Number(jobid))

    currentJob.value = findJob
  }

  const updateApplied = async (jobid: number) => {
    if (!jobid) return
    const findJob = jobList.value?.find((item) => item.id == jobid)

    if (findJob) {
      findJob.applied = true
    }
  }

  return { searchByTitle, setCurrentJob, searchByCategory, updateApplied, jobList, currentJob }
})
