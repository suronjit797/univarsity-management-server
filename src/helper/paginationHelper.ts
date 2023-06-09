import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortOrder?: 'asc' | 'desc'
  sortBy?: string
}

type ISortCondition = { [key: string]: SortOrder }

type ICalculationReturn = {
  page: number
  limit: number
  skip: number
  sortCondition: ISortCondition
}

export const calculation = (option: IOptions): ICalculationReturn => {
  const page = Math.abs(Number(option.page || 1))
  const limit = Math.abs(Number(option.limit || 100))
  const skip = (page - 1) * limit

  const sortOrder = option.sortOrder || 'desc'
  const sortBy = option.sortBy || 'desc'

  const sortCondition: ISortCondition = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder as SortOrder
  }

  return { page, limit, skip, sortCondition }
}
