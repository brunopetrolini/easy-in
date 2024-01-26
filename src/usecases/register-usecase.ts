import type { UsersRepository } from '@/repositories'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './error'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(props: RegisterUseCaseProps): Promise<void> {
    const { name, email, password } = props

    const saltRounds = 6
    const passwordHash = await hash(password, saltRounds)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.insert({ name, email, passwordHash })
  }
}
