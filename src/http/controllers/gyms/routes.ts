import { FastifyInstance } from 'fastify'

import { verifyAuthMiddy } from '@/http/middlewares'
import { create } from './create-controller'
import { search } from './search-controller'
import { nearby } from './nearby-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyAuthMiddy)

  app.post('/gyms', create)
  app.get('/gyms', search)
  app.get('/gyms', nearby)
}
