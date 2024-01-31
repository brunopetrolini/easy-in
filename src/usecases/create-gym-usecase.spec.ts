import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories'
import { CreateGymUseCase } from './create-gym-usecase'

describe('Create Gym Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Bio Health - Center',
      description: 'The best gym in the city',
      phone: '35999999999',
      latitude: -21.7855024,
      longitude: -46.5626038,
    })

    expect(gym.id).toStrictEqual(expect.any(String))
  })
})
