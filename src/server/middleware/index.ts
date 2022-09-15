import { Express } from 'express'
import helmet, { hidePoweredBy } from 'helmet'

const middleware = (app: Express) => {
  app.use(
    helmet({
      frameguard: {
        action: 'sameorigin',
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
    }),
    hidePoweredBy(),
  )
}

export default middleware
