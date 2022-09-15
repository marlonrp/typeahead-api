import { Router } from 'express'

const routes = Router()

routes.get('/health-check', (_, res) => res.sendStatus(204))

export default routes
