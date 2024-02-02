import { randomUUID } from 'node:crypto'

import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

import type { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils'

export class InMemoryGymsRepository implements GymsRepository {
  public readonly gyms: Gym[] = []

  public async insert(data: Prisma.GymCreateInput): Promise<Gym> {
    this.gyms.push({
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    })

    return this.gyms[this.gyms.length - 1]
  }

  public async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  public async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10
    })

    return gyms
  }
}
