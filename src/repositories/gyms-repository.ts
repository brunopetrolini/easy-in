import type { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  insert(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}