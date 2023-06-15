import { z } from 'zod'

export const studentValidationZod = z.object({
  password: z.string(),
  student: z.object({
    name: z.object({
      firstName: z.string(),
      middleName: z.string().optional(),
      lastName: z.string(),
    }),
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    bloodGroup: z.enum(['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-']).optional(),
    guardian: z.object({
      fatherName: z.string(),
      fatherOccupation: z.string(),
      fatherContactNo: z.string(),
      motherName: z.string(),
      motherOccupation: z.string(),
      motherContactNo: z.string(),
      address: z.string(),
    }),
    localGuardian: z.object({
      name: z.string(),
      occupation: z.string(),
      contactNo: z.string(),
      address: z.string(),
    }),
    profileImage: z.string().optional(),
  }),
})
