import { Schema, model } from 'mongoose'
import { ISemester, SemesterModel } from './semesterInterface'
import { months } from './semesterConstant'
import ApiError from '../../../ApiError'
import httpStatus from 'http-status'

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


semesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.find({ title: this.title, year: this.year })
  if (isExist.length > 0) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE,`${this.title} already exists in ${this.year}`)
  }
  next()
})

const AcademicSemester = model<ISemester, SemesterModel>('AcademicSemester', semesterSchema)

export default AcademicSemester
