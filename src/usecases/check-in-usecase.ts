import type { CheckIn } from '@prisma/client'

import type { CheckInsRepository, GymsRepository } from '@/repositories'
import {
  ResourceNotFoundError,
  UserAlreadyCheckedInTodayError,
  UserTooFarFromGymError,
} from './error'
import { getDistanceBetweenCoordinates } from '@/utils'

interface CheckInUseCaseInput {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseOutput {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository,
  ) {}

  public async execute(
    input: CheckInUseCaseInput,
  ): Promise<CheckInUseCaseOutput> {
    const gym = await this.gymsRepository.findById(input.gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distanceInKilometer = getDistanceBetweenCoordinates(
      {
        latitude: input.userLatitude,
        longitude: input.userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETER = 0.1
    if (distanceInKilometer > MAX_DISTANCE_IN_KILOMETER) {
      throw new UserTooFarFromGymError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      input.userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new UserAlreadyCheckedInTodayError()
    }

    const checkIn = await this.checkInsRepository.insert(input)

    return { checkIn }
  }
}
