export default interface Job {
  id: number
  title: string
  category: string
  company: string
  description: string
  location: string
  applied: boolean
  salary?: boolean | number
}
