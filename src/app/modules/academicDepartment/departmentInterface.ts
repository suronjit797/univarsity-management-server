import { Model, Types } from 'mongoose'
import { IFaculty } from '../academicFaculty/facultyInterface'

export type IDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IFaculty
}

export type departmentModel = Model<IDepartment, Record<string, unknown>>
