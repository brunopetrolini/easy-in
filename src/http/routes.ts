import type { FastifyInstance } from 'fastify'

import { authenticate, register, profile } from './controllers'
import { verifyAuthMiddy } from './middlewares'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyAuthMiddy] }, profile)
}
