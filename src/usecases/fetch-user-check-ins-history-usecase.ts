import type { CheckIn } from '@prisma/client'

import type { CheckInsRepository } from '@/repositories'

interface FetchUserCheckInsHistoryUseCaseInput {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseOutput {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  public async execute(
    input: FetchUserCheckInsHistoryUseCaseInput,
  ): Promise<FetchUserCheckInsHistoryUseCaseOutput> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      input.userId,
      input.page,
    )
    return { checkIns }
  }
}
