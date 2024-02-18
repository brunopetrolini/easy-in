import { FastifyInstance } from 'fastify'

import { verifyAuthMiddy } from '@/http/middlewares'
import { create } from './create-gym-controller'
import { search } from './search-gyms-controller'
import { nearby } from './nearby-gyms-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyAuthMiddy)

  app.post('/gyms', create)
  app.get('/gyms', search)
  app.get('/gyms', nearby)
}
