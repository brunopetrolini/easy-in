import type { Prisma, User } from '@prisma/client'

import { prisma } from '@/lib'

export class PrismaUsersRepository {
  public async insert(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })
    return user
  }
}
