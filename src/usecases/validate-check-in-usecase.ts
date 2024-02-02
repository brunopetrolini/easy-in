import type { CheckIn } from '@prisma/client'

import type { CheckInsRepository } from '@/repositories'
import { LateCheckInValidationError, ResourceNotFoundError } from './error'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseInput {
  checkInId: string
}

interface ValidateCheckInUseCaseOutput {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private readonly checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseInput): Promise<ValidateCheckInUseCaseOutput> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minute',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validatedAt = new Date()
    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
