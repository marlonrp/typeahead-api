import { NextFunction, Request, Response, Router } from 'express'

import TypeaheadController from '@app/controllers/typeaheadController'
import { AllowedMethods, HttpCodeEnum, HttpStatusEnum, ResponseError } from '@app/core/types/response'

const routes = Router()
const typeaheadController = new TypeaheadController()

const methods =
  (methods = [AllowedMethods.GET]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (methods.includes(req.method as AllowedMethods)) return next()

    const responseError: ResponseError = {
      code: HttpCodeEnum.METHOD_NOT_ALLOWED,
      status: HttpStatusEnum.METHOD_NOT_ALLOWED,
      message: `The ${req.method} method for the "${req.originalUrl}" route is not supported.`,
    }
    return res.status(HttpStatusEnum.METHOD_NOT_ALLOWED).send(responseError)
  }

routes.all('/typeahead/:name', methods(), typeaheadController.search)
routes.all('/typeahead', methods([AllowedMethods.POST]), typeaheadController.insert)

export default routes
