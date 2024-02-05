import { FastifyInstance } from 'fastify'

import { verifyAuthMiddy } from '@/http/middlewares'
import { create } from './create-gym-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.post('/gyms', { onRequest: [verifyAuthMiddy] }, create)
}
