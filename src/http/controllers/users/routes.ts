import type { FastifyInstance } from 'fastify'

import { verifyAuthMiddy } from '@/http/middlewares'
import { register } from './register-controller'
import { profile } from './profile-controller'
import { authenticate } from './authenticate-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.post('/users', register)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyAuthMiddy] }, profile)
}
