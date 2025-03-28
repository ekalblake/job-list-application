import { ref } from 'vue'
import { defineStore } from 'pinia'
import { jobService } from '@/services/jobServices/JobServices'
import IJob from '@/interfaces/IJob'

export const useJobStore = defineStore('job', () => {
  const jobList = ref<IJob[] | null>(null)

  const currentJob = ref<IJob | null>(null)

  const searchByTitle = async (name: string) : Promise<void> => {
    const response = name ? await jobService.searchByTitle(name) : await jobService.searchJob()
    jobList.value = response
  }

  const searchByCategory = async (category: string): Promise<void> => {
    if (!category) {
      const response = await jobService.searchJob()
      jobList.value = response
    } else {
      const response = await jobService.searchByCategory(category)
      jobList.value = response
    }
  }

  const searchByCategoryJob = async (category: string): Promise<IJob[]> => {
    const response = await jobService.searchByCategory(category)
    return response
  }

  const setCurrentJob = async (jobid: string | undefined) : Promise<void> => {
    if (!jobid) return

    const findJob = jobList.value.find((item) => item.id == Number(jobid))

    currentJob.value = findJob
  }

  const loadCurrentJob = async (jobid: string | undefined) => {
    if (!jobid) return

    const getJobList = await jobService.searchJob()

    const findJob = getJobList.find((item) => item.id == Number(jobid))

    currentJob.value = findJob
  }

  const updateApplied = (jobid: number) => {
    if (!jobid) return
    const findJob = jobList.value?.find((item) => item.id == jobid)

    if (findJob) {
      findJob.applied = true
    }
  }

  const deleteCurrentJob = () => {
    currentJob.value = null
  }

  return {
    searchByTitle,
    setCurrentJob,
    searchByCategory,
    updateApplied,
    deleteCurrentJob,
    searchByCategoryJob,
    loadCurrentJob,
    jobList,
    currentJob,
  }
})
