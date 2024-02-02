import { PrismaCheckInsRepository } from '@/repositories'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history-usecase'

export const makeFetchUserCheckInHistoryUseCase =
  (): FetchUserCheckInsHistoryUseCase => {
    const checkInRepository = new PrismaCheckInsRepository()
    const fetchUserCheckInHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInRepository,
    )
    return fetchUserCheckInHistoryUseCase
  }
