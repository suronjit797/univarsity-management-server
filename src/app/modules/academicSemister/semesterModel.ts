import { Schema, model } from 'mongoose'
import { ISemester, SemesterModel } from './semesterInterface'

const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const AcademicSemester = model<ISemester, SemesterModel>('AcademicSemester', semesterSchema)

export default AcademicSemester
