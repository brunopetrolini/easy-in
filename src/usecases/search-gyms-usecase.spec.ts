import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories'
import { SearchGymsUseCase } from './search-gyms-usecase'

describe('Search Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.insert({
      title: 'JavaScript Gym',
      description: 'The best gym in the city',
      phone: '35999999999',
      latitude: -21.7855024,
      longitude: -46.5626038,
    })

    await gymsRepository.insert({
      title: 'TypeScript Gym',
      description: 'The best gym in the city',
      phone: '35999999999',
      latitude: -21.7855024,
      longitude: -46.5626038,
    })

    const { gyms } = await sut.execute({ query: 'TypeScript', page: 1 })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to search for gyms with pagination', async () => {
    for (let counter = 1; counter <= 22; counter++) {
      await gymsRepository.insert({
        title: `JavaScript Gym ${counter}`,
        description: 'The best gym in the city',
        phone: '35999999999',
        latitude: -21.7855024,
        longitude: -46.5626038,
      })

      await gymsRepository.insert({
        title: `TypeScript Gym ${counter}`,
        description: 'The best gym in the city',
        phone: '35999999999',
        latitude: -21.7855024,
        longitude: -46.5626038,
      })
    }

    const { gyms } = await sut.execute({ query: 'TypeScript', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ])
  })
})
