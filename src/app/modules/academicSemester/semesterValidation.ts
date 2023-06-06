import { z } from 'zod'
import { months } from './semesterConstant'

export const semesterValidationZod = z.object({
  title: z.enum(['Autumn', 'Summer', 'Fall']),
  year: z.number(),
  code: z.enum(['01', '02', '03']),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
})
