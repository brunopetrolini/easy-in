import type { Prisma, User } from '@prisma/client'

import type { UsersRepository } from '../users-repository'
import { prisma } from '@/lib'

export class PrismaUsersRepository implements UsersRepository {
  public async insert(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })
    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  }
}
