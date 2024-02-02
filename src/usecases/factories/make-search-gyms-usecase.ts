import { PrismaGymsRepository } from '@/repositories'
import { SearchGymsUseCase } from '../search-gyms-usecase'

export const makeSearchGymsUseCase = (): SearchGymsUseCase => {
  const searchGymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(searchGymsRepository)
  return searchGymsUseCase
}
