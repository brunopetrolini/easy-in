import { PrismaCheckInsRepository, PrismaGymsRepository } from '@/repositories'
import { CheckInUseCase } from '../check-in-usecase'

export const makeCheckInUseCase = (): CheckInUseCase => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)
  return checkInUseCase
}
