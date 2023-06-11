import { Schema, model } from 'mongoose'
import { IFaculty, facultyModel } from './facultyInterface'

const facultySchema = new Schema<IFaculty>(
  {
    title: {
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

const AcademicFaculty = model<IFaculty, facultyModel>('AcademicFaculty', facultySchema)

export default AcademicFaculty
