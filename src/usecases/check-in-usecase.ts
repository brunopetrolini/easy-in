import type { CheckIn } from '@prisma/client'

import type { CheckInsRepository } from '@/repositories'

interface CheckInUseCaseInput {
  userId: string
  gymId: string
}

interface CheckInUseCaseOutput {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  public async execute(
    input: CheckInUseCaseInput,
  ): Promise<CheckInUseCaseOutput> {
    const checkIn = await this.checkInsRepository.insert(input)

    return { checkIn }
  }
}
