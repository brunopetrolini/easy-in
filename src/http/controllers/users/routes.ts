import type { FastifyInstance } from 'fastify'

import { verifyAuthMiddy } from '@/http/middlewares'
import { register } from './register-controller'
import { profile } from './profile-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyAuthMiddy] }, profile)
}
