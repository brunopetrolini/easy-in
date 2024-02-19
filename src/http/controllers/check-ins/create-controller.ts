import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCheckInUseCase } from '@/usecases/factories'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id: gymId } = createCheckInParamsSchema.parse(request.params)

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
