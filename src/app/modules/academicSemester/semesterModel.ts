import { Schema, model } from 'mongoose'
import { ISemester, SemesterModel } from './semesterInterface'
import { months } from './semesterConstant'


const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  { timestamps: true }
)

const AcademicSemester = model<ISemester, SemesterModel>('AcademicSemester', semesterSchema)

export default AcademicSemester
