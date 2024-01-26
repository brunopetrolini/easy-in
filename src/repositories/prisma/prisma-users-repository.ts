import type { Prisma } from '@prisma/client'

import { prisma } from '@/lib'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  public async insert(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })
    return user
  }

  public async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  }
}
