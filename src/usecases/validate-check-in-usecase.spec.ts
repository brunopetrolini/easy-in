import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories'
import { ValidadeCheckInUseCase } from './validate-check-in-usecase'
import { LateCheckInValidationError, ResourceNotFoundError } from './error'

describe('Validate Check In Use Case', () => {
  let checkInRepository: InMemoryCheckInsRepository
  let sut: ValidadeCheckInUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.insert({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
    })

    await sut.execute({ checkInId: createdCheckIn.id })

    expect(createdCheckIn.validatedAt).toEqual(expect.any(Date))
    expect(checkInRepository.checkIns[0].validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    const promise = sut.execute({
      checkInId: 'inexistent-check-in-id',
    })

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) // 13:40 UTC

    const createdCheckIn = await checkInRepository.insert({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    const promise = sut.execute({ checkInId: createdCheckIn.id })

    await expect(promise).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
