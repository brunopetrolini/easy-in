import type { CheckInsRepository } from '@/repositories'

interface GetUserMetricsUseCaseInput {
  userId: string
}

interface GetUserMetricsUseCaseOutput {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  public async execute({
    userId,
  }: GetUserMetricsUseCaseInput): Promise<GetUserMetricsUseCaseOutput> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
