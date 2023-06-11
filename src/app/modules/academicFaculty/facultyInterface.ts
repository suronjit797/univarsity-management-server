import { Model } from 'mongoose'

export type IFaculty = {
  title: string
}

export type facultyModel = Model<IFaculty, Record<string, unknown>>
