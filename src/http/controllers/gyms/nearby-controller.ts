import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyGymUseCase } from '@/usecases/factories'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.body)

  const nearbyGymsUseCase = makeFetchNearbyGymUseCase()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
