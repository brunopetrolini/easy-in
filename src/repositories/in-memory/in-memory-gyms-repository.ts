import type { Gym } from '@prisma/client'
import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public readonly gyms: Gym[] = []

  public async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
