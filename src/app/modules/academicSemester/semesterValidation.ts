import { z } from 'zod'
import { months } from './semesterConstant'

export const semesterValidationZod = z.object({
  title: z.enum(['Autumn', 'Summer', 'Fall']),
  year: z.number(),
  code: z.enum(['01', '02', '03']),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
})
export const semesterUpdateValidationZod = z
  .object({
    title: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
    year: z.number().optional(),
    code: z.enum(['01', '02', '03']).optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  })
  .refine((data) => (data.title && data.code) || (!data.title && !data.code), {
    message: 'Please provide either title and code or neither',
  })
