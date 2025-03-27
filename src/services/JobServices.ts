import { jobs } from '@/job_list.json'

import IJob from '@/interfaces/IJob'

export class JobServices {
  public async searchJob(): Promise<IJob[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(jobs)
      }, 3000)
    })
  }

  public async searchByTitle(name: string): Promise<IJob[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const returnJob = jobs.filter((job) => job.title.includes(name))
        resolve(returnJob)
      }, 3000)
    })
  }

  public async getDetailedJob(id: number): Promise<IJob> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const job = jobs.find((job) => job.id == id)
        resolve(job)
      }, 3000)
    })
  }
}

export const jobService = new JobServices()
