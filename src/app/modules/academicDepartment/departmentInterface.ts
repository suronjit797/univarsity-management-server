import { Model } from 'mongoose'

export type IDepartment = {
  title: string
}

export type departmentModel = Model<IDepartment, Record<string, unknown>>
