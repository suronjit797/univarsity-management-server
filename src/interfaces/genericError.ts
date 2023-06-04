export type IErrorMessage = {
  path: string
  message: string
}

export type IErrorResponse = {
  success: boolean,
  message: string,
  errorMessages: IErrorMessage[],
  stack?:  any
}
