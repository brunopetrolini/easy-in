import { PrismaUsersRepository } from '@/repositories'
import { RegisterUseCase } from '../register-usecase'

export const makeRegisterUseCase = (): RegisterUseCase => {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)
  return registerUseCase
}
