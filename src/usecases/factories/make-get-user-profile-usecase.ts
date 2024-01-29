import { PrismaUsersRepository } from '@/repositories'
import { GetUserProfileUseCase } from '../get-user-profile-usecase'

export const makeGetUserProfileUseCase = (): GetUserProfileUseCase => {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  return getUserProfileUseCase
}
