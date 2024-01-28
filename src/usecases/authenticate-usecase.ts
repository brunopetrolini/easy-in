import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'

import { UsersRepository } from '@/repositories'
import { InvalidCredentialsError } from './error'

interface AuthenticateUseCaseInput {
  email: string
  password: string
}

interface AuthenticateUseCaseOutput {
  user: User
}

export class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
