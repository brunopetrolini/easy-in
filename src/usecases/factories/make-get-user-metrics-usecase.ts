import { PrismaCheckInsRepository } from '@/repositories'
import { GetUserMetricsUseCase } from '../get-user-metrics-usecase'

export const makeGetUserMetricsUseCase = (): GetUserMetricsUseCase => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  return getUserMetricsUseCase
}
