import { hash } from 'bcryptjs'

import { prisma } from '@/lib'
import { PrismaUsersRepository } from '@/repositories'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export async function registerUseCase(props: RegisterUseCaseProps) {
  const { name, email, password } = props

  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })
  if (userWithSameEmail) {
    throw new Error('User with same email already exists')
  }

  const usersRepository = new PrismaUsersRepository()
  await usersRepository.insert({ name, email, passwordHash })
}
