import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/usecases/factories'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({ checkInId: id })

  return reply.status(204).send()
}
