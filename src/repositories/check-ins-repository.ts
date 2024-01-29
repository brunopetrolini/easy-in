import type { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  insert(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
