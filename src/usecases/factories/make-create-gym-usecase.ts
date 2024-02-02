import { PrismaGymsRepository } from '@/repositories'
import { CreateGymUseCase } from '../create-gym-usecase'

export const makeCreateGymUseCase = (): CreateGymUseCase => {
  const gymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)
  return createGymUseCase
}
