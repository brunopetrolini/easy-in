import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'

import {
  InMemoryCheckInsRepository,
  InMemoryGymsRepository,
} from '@/repositories'
import { CheckInUseCase } from './check-in-usecase'

describe('Check In Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'any_gym_id',
      title: 'any_gym_name',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

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
      userLatitude: -21.8333184,
      userLongitude: -46.4617472,
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -21.8333184,
      userLongitude: -46.4617472,
    })

    vi.setSystemTime(new Date(2024, 0, 20, 7, 0, 0))

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -21.8333184,
      userLongitude: -46.4617472,
    })

    await expect(promise).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -21.8333184,
      userLongitude: -46.4617472,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 7, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: -21.8333184,
      userLongitude: -46.4617472,
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })
})
