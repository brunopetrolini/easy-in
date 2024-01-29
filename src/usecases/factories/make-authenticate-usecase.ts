import { PrismaUsersRepository } from '@/repositories'
import { AuthenticateUseCase } from '../authenticate-usecase'

export const makeAuthenticateUseCase = (): AuthenticateUseCase => {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)
  return authenticateUseCase
}
