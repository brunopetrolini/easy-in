import { FastifyInstance } from 'fastify'

import { verifyAuthMiddy, verifyUserRoleMiddy } from '@/http/middlewares'
import { create } from './create-controller'
import { search } from './search-controller'
import { nearby } from './nearby-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyAuthMiddy)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  /** Admin only */
  app.post('/gyms', { onRequest: [verifyUserRoleMiddy('ADMIN')] }, create)
}
