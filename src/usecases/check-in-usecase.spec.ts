import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  InMemoryCheckInsRepository,
  InMemoryGymsRepository,
} from '@/repositories'
import { CheckInUseCase } from './check-in-usecase'
import { MaxDistanceError, MaxNumberOfCheckInsError } from './error'

describe('Check In Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.insert({
      id: 'center_gym_id',
      title: 'Bio Health - Center',
      description: 'The best gym in the city',
      phone: null,
      latitude: -21.7855024,
      longitude: -46.5626038,
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
      gymId: 'center_gym_id',
      userLatitude: -21.7854279,
      userLongitude: -46.5617159,
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'center_gym_id',
      userLatitude: -21.7854279,
      userLongitude: -46.5617159,
    })

    vi.setSystemTime(new Date(2024, 0, 20, 7, 0, 0))

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'center_gym_id',
      userLatitude: -21.7854279,
      userLongitude: -46.5617159,
    })

    await expect(promise).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'center_gym_id',
      userLatitude: -21.7854279,
      userLongitude: -46.5617159,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 7, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'center_gym_id',
      userLatitude: -21.7854279,
      userLongitude: -46.5617159,
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 5, 0, 0))

    await gymsRepository.insert({
      id: 'avenue_gym_id',
      title: 'Bio Health - Av. João Pinheiro',
      description: 'The best gym in the city',
      phone: '35999999999',
      latitude: -21.7852725,
      longitude: -46.5815417,
    })

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'avenue_gym_id',
      userLatitude: -21.8333184,
      userLongitude: -46.4617472,
    })

    await expect(promise).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
