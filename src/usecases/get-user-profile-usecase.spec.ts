import { beforeEach, describe, it, expect } from 'vitest'

import { InMemoryUsersRepository, type UsersRepository } from '@/repositories'
import { GetUserProfileUseCase } from './get-user-profile-usecase'
import { ResourceNotFoundError } from './error'

describe('Get User Profile Use Case', () => {
  let usersRepository: UsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.insert({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      passwordHash: 'hashed_password',
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user).toBe(createdUser)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await usersRepository.insert({
      id: 'user_id',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      passwordHash: 'hashed_password',
    })

    const promise = sut.execute({ userId: 'wrong_id' })

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
