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

  public async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.checkIns.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }

  public async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  public async findManyByUserId(
    userId: string,
    page: number,
  ): Promise<CheckIn[]> {
    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.userId === userId)
      .slice((page - 1) * 20, page * 20)
    return checkIns
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

  public async countByUserId(userId: string): Promise<number> {
    const checkInsCount = this.checkIns.filter(
      (checkIn) => checkIn.userId === userId,
    )
    return checkInsCount.length
  }
}
