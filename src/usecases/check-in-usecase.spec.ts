import { beforeEach, describe, expect, it } from 'vitest'

import {
  InMemoryCheckInsRepository,
  type CheckInsRepository,
} from '@/repositories'
import { CheckInUseCase } from './check-in-usecase'

describe('Check In Use Case', () => {
  let checkInsRepository: CheckInsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })
})
