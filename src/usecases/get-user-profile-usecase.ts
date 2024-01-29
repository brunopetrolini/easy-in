import { User } from '@prisma/client'

import type { UsersRepository } from '@/repositories'
import { ResourceNotFoundError } from './error'

interface GetUserProfileUseCaseInput {
  userId: string
}

interface GetUserProfileUseCaseOutput {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    userId,
  }: GetUserProfileUseCaseInput): Promise<GetUserProfileUseCaseOutput> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
