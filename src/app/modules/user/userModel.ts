import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './userInterface'

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
      enum: ['super_admin','admin', 'student', 'faculty'],
      default: 'student',
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const User = model<IUser, UserModel>('User', userSchema)

export default User
