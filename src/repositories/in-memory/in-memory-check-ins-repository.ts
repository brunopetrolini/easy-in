import { randomUUID } from 'node:crypto'
import type { CheckIn, Prisma } from '@prisma/client'

import { CheckInsRepository } from '../check-ins-repository'

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
}
