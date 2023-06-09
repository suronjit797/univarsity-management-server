import { z } from 'zod'

export const userValidationZod = z.object({
  uid: z.enum(['user', 'admin']).optional(),
  role: z.string(),
  password: z.string(),
})

