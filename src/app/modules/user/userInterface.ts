import { Model } from "mongoose"

export type IUser = {
  uid: string
  role: string
  password: string
}


export type UserModel = Model<IUser, Record<string, unknown>>