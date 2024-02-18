import { FastifyInstance } from 'fastify'

import { verifyAuthMiddy } from '@/http/middlewares'
import { create } from './create-gym-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyAuthMiddy)

  app.post('/gyms', create)
}
