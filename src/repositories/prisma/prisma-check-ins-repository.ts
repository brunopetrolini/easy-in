import type { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { prisma } from '@/lib'
import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInRepository implements CheckInsRepository {
  public async insert(
    data: Prisma.CheckInUncheckedCreateInput,
  ): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }

  public async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } })
    return checkIn
  }

  public async findManyByUserId(
    userId: string,
    page: number,
  ): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: { userId },
      skip: (page - 1) * 20,
      take: 20,
    })
    return checkIns
  }

  public async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  public async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({ where: { userId } })
    return count
  }

  public async save(checkIn: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: checkIn,
    })
    return updatedCheckIn
  }
}
