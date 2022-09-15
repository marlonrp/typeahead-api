export enum HttpCodeEnum {
  OK = 'OK',
  CREATED = 'CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  SERVER_ERROR = 'SERVER_ERROR',
}

export enum HttpStatusEnum {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  METHOD_NOT_ALLOWED = 405,
  SERVER_ERROR = 500,
}

export type ResponseError = {
  status: HttpStatusEnum
  code: HttpCodeEnum
  message: string
}

export const defaultResponseError: ResponseError = {
  status: HttpStatusEnum.SERVER_ERROR,
  code: HttpCodeEnum.SERVER_ERROR,
  message: 'Internal app/server error',
}

export const badRequestResponseError = (message = 'Missing params, check the documentation, please!'): ResponseError => ({
  status: HttpStatusEnum.BAD_REQUEST,
  code: HttpCodeEnum.BAD_REQUEST,
  message,
})

export enum AllowedMethods {
  GET = 'GET',
  POST = 'POST',
}
