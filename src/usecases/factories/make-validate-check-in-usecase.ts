import { PrismaCheckInsRepository } from '@/repositories'
import { ValidateCheckInUseCase } from '../validate-check-in-usecase'

export const makeValidateCheckInUseCase = (): ValidateCheckInUseCase => {
  const checkInRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)
  return validateCheckInUseCase
}
