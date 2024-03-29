import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history-usecase'

describe('Fetch User Check-in History Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: FetchUserCheckInsHistoryUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.insert({
      userId: 'user_id_01',
      gymId: 'gym_id_01',
    })

    await checkInsRepository.insert({
      userId: 'user_id_01',
      gymId: 'gym_id_02',
    })

    const { checkIns } = await sut.execute({ userId: 'user_id_01', page: 1 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym_id_01' }),
      expect.objectContaining({ gymId: 'gym_id_02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let count = 1; count <= 22; count++) {
      await checkInsRepository.insert({
        userId: 'user_id_01',
        gymId: `gym_id_${count}`,
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user_id_01', page: 2 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym_id_21' }),
      expect.objectContaining({ gymId: 'gym_id_22' }),
    ])
  })
})
