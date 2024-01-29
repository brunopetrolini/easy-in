import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import type { CheckIn, Prisma } from '@prisma/client'

import type { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public readonly checkIns: CheckIn[] = []

  public async insert(
    data: Prisma.CheckInUncheckedCreateInput,
  ): Promise<CheckIn> {
    this.checkIns.push({
      id: data.id ?? randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ?? null,
      createdAt: new Date(),
    } as CheckIn)

    return this.checkIns[this.checkIns.length - 1]
  }

  public async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.userId === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
}
