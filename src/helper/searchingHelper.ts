import { Request } from 'express'
import pic from '../shared/pick'
import { Document } from 'mongoose'
import { IPartialSearchableFields, ISearchingAndFiltering } from '../interfaces/searchingAndFiltering'

export const searchingAndFiltering = (
  req: Request,
  schemaName: Document,
  partialSearchableFields: IPartialSearchableFields
): ISearchingAndFiltering => {
  // get all keys that are in schema  such as [title, year, code, startMonth, endMonth] from semesterModel
  const schemaKeys = Object.keys(schemaName.schema.obj)

  // make object by pic function
  const filter = pic(req.query, ['searchTerm', ...schemaKeys])

  const { searchTerm, ...filterData } = filter
  const andCondition = []

  if (searchTerm && partialSearchableFields.length > 0) {
    andCondition.push({
      $or: partialSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
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

  // const where: { [key: string]: object } = {}
  // if (andCondition.length > 0) {
  //   where.$and = andCondition
  // }
  // return where

  // instant of where, we can use

  return andCondition.length > 0 ? { $and: andCondition } : {}
}
