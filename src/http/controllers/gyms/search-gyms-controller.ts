import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsUseCase } from '@/usecases/factories'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(request.body)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const gyms = await searchGymsUseCase.execute({ query, page })

  return reply.status(200).send({ gyms })
}
