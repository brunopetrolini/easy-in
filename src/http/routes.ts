import type { FastifyInstance } from 'fastify'

import { register } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
