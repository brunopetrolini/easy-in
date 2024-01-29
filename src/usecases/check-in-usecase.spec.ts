import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    })

    vi.setSystemTime(new Date(2024, 0, 20, 7, 0, 0))

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    })

    await expect(promise).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    })

    vi.setSystemTime(new Date(2024, 0, 21, 7, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })
})
