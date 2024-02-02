import type { CheckIn } from '@prisma/client'

import type { CheckInsRepository } from '@/repositories'
import { ResourceNotFoundError } from './error'

interface ValidadeCheckInInput {
  checkInId: string
}

interface ValidadeCheckInOutput {
  checkIn: CheckIn
}

export class ValidadeCheckInUseCase {
  constructor(private readonly checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidadeCheckInInput): Promise<ValidadeCheckInOutput> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validatedAt = new Date()
    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
