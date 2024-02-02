import { PrismaGymsRepository } from '@/repositories'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gym-usecase'

export const makeFetchNearbyGymUseCase = (): FetchNearbyGymsUseCase => {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymUseCase = new FetchNearbyGymsUseCase(gymsRepository)
  return fetchNearbyGymUseCase
}
