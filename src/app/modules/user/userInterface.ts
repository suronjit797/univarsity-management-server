import { Model, Types } from 'mongoose'
import { IStudent } from '../student/studentInterface'

export type IUser = {
  uid: string
  role: string
  password: string
  student: Types.ObjectId | IStudent
  admin: Types.ObjectId // | IAdmin
  faculty: Types.ObjectId // | IFaculty
}

export type UserModel = Model<IUser, Record<string, unknown>>
