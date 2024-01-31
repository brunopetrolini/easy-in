import { GymsRepository } from '@/repositories'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseInput {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseOutput {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  public async execute(
    input: CreateGymUseCaseInput,
  ): Promise<CreateGymUseCaseOutput> {
    const gym = await this.gymsRepository.insert(input)
    return { gym }
  }
}
