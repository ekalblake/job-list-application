import { jobs } from '@/job_list.json'

import IJob from '@/interfaces/IJob'

export class JobServices {
  public async searchJob(): Promise<IJob[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(jobs)
      }, 1000)
    })
  }

  public async searchByTitle(name: string): Promise<IJob[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerName = name.toLocaleLowerCase()

        const returnJobs = jobs.filter(
          (job) =>
            job.title.toLocaleLowerCase().includes(lowerName) ||
            job.company.toLocaleLowerCase().includes(lowerName) ||
            job.location.toLocaleLowerCase().includes(lowerName),
        )

        resolve(returnJobs)
      }, 1000)
    })
  }

  public async searchByCategory(name: string): Promise<IJob[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const returnJobs = jobs.filter((job) =>
          job.category.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
        )
        resolve(returnJobs)
      }, 1000)
    })
  }

  public async getDetailedJob(id: number): Promise<IJob> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const job = jobs.find((job) => job.id == id)
        resolve(job)
      }, 1000)
    })
  }
}

export const jobService = new JobServices()
