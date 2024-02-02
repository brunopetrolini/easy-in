import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories'
import { GetUserMetricsUseCase } from './get-user-metrics-usecase'

describe('Get User Metrics Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: GetUserMetricsUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.insert({
      userId: 'user_id_01',
      gymId: 'gym_id_01',
    })

    await checkInsRepository.insert({
      userId: 'user_id_01',
      gymId: 'gym_id_02',
    })

    const { checkInsCount } = await sut.execute({ userId: 'user_id_01' })

    expect(checkInsCount).toBe(2)
  })
})
