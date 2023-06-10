import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'

export const validatorMiddleware =
  (validatorZod: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validatorZod.parseAsync(req.body)

      return next()
    } catch (error) {
      next(error)
    }
  }
