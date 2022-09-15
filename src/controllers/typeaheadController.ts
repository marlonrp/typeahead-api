import { Request, Response } from 'express'

import { ResponseErrorHandler, ResponseSuccessHandler } from '@app/core/handlers/response'
import { HttpStatusEnum } from '@app/core/types/response'
import TypeaheadService from '@app/src/services/typeaheadService'

const service = new TypeaheadService()

export default class TypeaheadController {
  async search(req: Request, res: Response) {
    const { name } = req.params
    try {
      const data = service.search(name)
      return ResponseSuccessHandler(req, res, data)
    } catch {
      return ResponseErrorHandler(res)
    }
  }

  async insert(req: Request, res: Response) {
    const { name } = req.body

    if (!name?.length) {
      return ResponseErrorHandler(res, HttpStatusEnum.BAD_REQUEST, 'Missing attribute name in the request body')
    }

    try {
      const data = service.insert(name)
      return ResponseSuccessHandler(req, res, data)
    } catch {
      return ResponseErrorHandler(res)
    }
  }
}
