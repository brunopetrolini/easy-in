import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  insert(data: Prisma.UserCreateInput): Promise<User>
}
