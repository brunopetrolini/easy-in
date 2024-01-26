import type { UsersRepository } from '@/repositories'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './error'

import type { User } from '@prisma/client'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(
    props: RegisterUseCaseProps,
  ): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = props

    const saltRounds = 6
    const passwordHash = await hash(password, saltRounds)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.insert({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}
