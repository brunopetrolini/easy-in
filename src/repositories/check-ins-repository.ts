import type { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  insert(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
