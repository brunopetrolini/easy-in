import type { FastifyInstance } from 'fastify'

import { verifyAuthMiddy, verifyUserRoleMiddy } from '@/http/middlewares'
import { create } from './create-controller'
import { validate } from './validate-controller'
import { history } from './history-controller'
import { metrics } from './metrics-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyAuthMiddy)

  app.post('/gyms/:id/check-in', create)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  /** Admin only */
  app.post(
    '/check-ins/:id/validate',
    { onRequest: [verifyUserRoleMiddy('ADMIN')] },
    validate,
  )
}
