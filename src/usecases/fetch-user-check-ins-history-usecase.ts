import type { CheckIn } from '@prisma/client'

import type { CheckInsRepository } from '@/repositories'

interface FetchUserCheckInsHistoryUseCaseInput {
  userId: string
}

interface FetchUserCheckInsHistoryUseCaseOutput {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  public async execute({
    userId,
  }: FetchUserCheckInsHistoryUseCaseInput): Promise<FetchUserCheckInsHistoryUseCaseOutput> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)
    return { checkIns }
  }
}
