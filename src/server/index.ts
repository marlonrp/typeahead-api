import cookieParser from 'cookie-parser'
import express, { json, urlencoded, Express } from 'express'

import middleware from '@app/server/middleware'
import routes from '@app/server/routes'
import typeaheadRoutes from '@app/server/routes/typeahead'

const setupApp = (): Express => {
  const app = express()

  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(cookieParser())
  middleware(app)

  app.use(routes)
  app.use(typeaheadRoutes)

  return app
}

export default setupApp
