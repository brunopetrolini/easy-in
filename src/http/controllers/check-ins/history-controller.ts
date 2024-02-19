import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchUserCheckInHistoryUseCase } from '@/usecases/factories'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyCheckInQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckInQuerySchema.parse(request.body)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
