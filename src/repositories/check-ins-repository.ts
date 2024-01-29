import type { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  insert(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
