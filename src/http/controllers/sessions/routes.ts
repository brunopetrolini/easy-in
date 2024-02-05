import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate-controller'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
}
