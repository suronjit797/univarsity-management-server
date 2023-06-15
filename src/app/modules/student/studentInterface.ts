import { Model, Types } from 'mongoose'

// inferSchemaType have to read from mongoose documentation

export type IStudent = {
  uid: string
  name: {
    firstName: string
    middleName?: string
    lastName: string
  }
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup: 'O+' | 'A+' | 'B+' | 'AB+' | 'O-' | 'A-' | 'B-' | 'AB-'
  guardian: {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
    address: string
  }

  localGuardian: {
    name: string
    occupation: string
    contactNo: string
    address: string
  }
  profileImage: string
  academicSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
}

export type StudentModel = Model<IStudent, Record<string, unknown>>
