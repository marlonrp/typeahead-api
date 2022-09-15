import { Request, Response } from 'express'

import { AllowedMethods, badRequestResponseError, defaultResponseError, HttpStatusEnum } from '@app/core/types/response'

export const ResponseSuccessHandler = (req: Request, res: Response, data: unknown) => {
  const status = AllowedMethods.GET === req.method ? HttpStatusEnum.OK : HttpStatusEnum.CREATED

  return res.status(status).json(data)
}

export const ResponseErrorHandler = (res: Response, status?: HttpStatusEnum, message?: string) => {
  if (status === HttpStatusEnum.BAD_REQUEST) {
    return res.status(HttpStatusEnum.BAD_REQUEST).json(badRequestResponseError(message))
  }

  return res.status(HttpStatusEnum.SERVER_ERROR).json(defaultResponseError)
}
