import { randomUUID } from 'node:crypto'

import type { User, Prisma } from '@prisma/client'

import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public readonly users: User[] = []

  public async insert(data: Prisma.UserCreateInput): Promise<User> {
    this.users.push({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    })

    return this.users[this.users.length - 1]
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
