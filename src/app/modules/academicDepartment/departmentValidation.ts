import { z } from 'zod'

export const departmentValidationZod = z.object({
  title: z.string(),
  academicFaculty: z.string(),
})
export const departmentUpdateValidationZod = z.object({
  title: z.string().optional(),
  academicFaculty: z.string().optional(),
})
