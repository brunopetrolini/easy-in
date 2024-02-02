import type { Gym } from '@prisma/client'

import type { GymsRepository } from '@/repositories'

interface SearchGymsUseCaseInput {
  query: string
  page: number
}

interface SearchGymsUseCaseOutput {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  public async execute(
    input: SearchGymsUseCaseInput,
  ): Promise<SearchGymsUseCaseOutput> {
    const gyms = await this.gymsRepository.searchMany(input.query, input.page)
    return { gyms }
  }
}
