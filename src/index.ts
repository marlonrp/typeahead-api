import { port, hostname } from '@app/server/constants'
import setupApp from '@app/server/index'

const server = setupApp()

server.listen({ port, hostname }, () =>
  // eslint-disable-next-line no-console
  console.log(`server running at http://${hostname}:${port}/`),
)
