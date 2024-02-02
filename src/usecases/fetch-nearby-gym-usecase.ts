import type { Gym } from '@prisma/client'

import type { GymsRepository } from '@/repositories'

interface FetchNearbyGymsUseCaseInput {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseOutput {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  public async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseInput): Promise<FetchNearbyGymsUseCaseOutput> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
