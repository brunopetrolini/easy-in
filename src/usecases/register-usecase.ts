import type { UsersRepository } from '@/repositories'
import { hash } from 'bcryptjs'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(props: RegisterUseCaseProps) {
    const { name, email, password } = props

    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('User with same email already exists')
    }

    await this.usersRepository.insert({ name, email, passwordHash })
  }
}
