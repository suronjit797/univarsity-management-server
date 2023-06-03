import { Model, Schema, model } from 'mongoose'
import { IUser } from './userInterface'

type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    uid: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      // default: 'user',
      required:true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = model<IUser, UserModel>('User', userSchema)

export default User
