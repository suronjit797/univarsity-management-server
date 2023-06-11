import { Schema, model } from 'mongoose'
import { IDepartment, departmentModel } from './departmentInterface'
const departmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
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

const AcademicDepartment = model<IDepartment, departmentModel>('AcademicDepartment', departmentSchema)

export default AcademicDepartment
