import { Model } from 'mongoose'

export type ISemester = {
  title: string
  year: number
  code: string
  startMonth: string
  endMonth: string
}

export type SemesterModel = Model<ISemester, Record<string, unknown>>
