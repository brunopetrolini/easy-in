import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gym-usecase'

describe('Fetch Nearby Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)

    await gymsRepository.insert({
      title: 'Near Gym',
      description: 'The best gym in the city',
      phone: '35999999999',
      latitude: -21.7849557,
      longitude: -46.5616009,
    })

    await gymsRepository.insert({
      title: 'Far Gym',
      description: 'The best gym in the city',
      phone: '35999999999',
      latitude: -21.9208263,
      longitude: -46.389302,
    })
  })

  it('should be able to fetch nearby gyms', async () => {
    const { gyms } = await sut.execute({
      userLatitude: -21.785308,
      userLongitude: -46.5614845,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
