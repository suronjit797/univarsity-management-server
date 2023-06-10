import { Request } from 'express'
import pic from '../shared/pick'
import { Document } from 'mongoose'

type IPartialSearchableFields = string[]

export const searchingAndFiltering = (
  schemaName: Document,
  req: Request,
  partialSearchableFields: IPartialSearchableFields
) => {
  const schemaKeys = Object.keys(schemaName.schema.obj)

  console.log(schemaKeys)

  const filter = pic(req.query, ['searchTerm', ...schemaKeys])

  const { searchTerm, ...filterData } = filter
  const andCondition = []
  const where: { [key: string]: object } = {}

  if (searchTerm) {
    andCondition.push({
      $or: partialSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm as string,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([key, value]) => ({ [key]: value })),
    })
  }

  if (andCondition.length > 0) {
    where.$and = andCondition
  }

  return where
}
