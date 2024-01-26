import { randomUUID } from 'node:crypto'

import type { User, Prisma } from '@prisma/client'

import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public readonly users: User[] = []

  public async insert(data: Prisma.UserCreateInput) {
    this.users.push({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    })

    return this.users[this.users.length - 1]
  }

  public async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
