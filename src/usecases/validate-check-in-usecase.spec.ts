import { describe, it, beforeEach, expect } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories'
import { ValidadeCheckInUseCase } from './validate-check-in-usecase'
import { ResourceNotFoundError } from './error'

describe('Validate Check In Use Case', () => {
  let checkInRepository: InMemoryCheckInsRepository
  let sut: ValidadeCheckInUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(checkInRepository)
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

    expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
