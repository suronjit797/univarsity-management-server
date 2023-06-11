import { z } from 'zod'

export const facultyValidationZod = z.object({
  title: z.string(),
})
export const facultyUpdateValidationZod = z.object({
  title: z.string().optional(),
})
