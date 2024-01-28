import { describe, it, expect, beforeEach, afterEach, vitest } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register-usecase'
import { InMemoryUsersRepository } from '@/repositories'
import type { UsersRepository } from '@/repositories'
import { UserAlreadyExistsError } from './error'

describe('Register Use Case', () => {
  let usersRepository: UsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'any_password',
    })

    const isPasswordCorrectlyHashed = await compare(
      'any_password',
      user.passwordHash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a new user with an email that is already in use', async () => {
    const email = 'example@mail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'any_password',
    })

    const promise = sut.execute({
      name: 'Jane Doe',
      email,
      password: 'other_password',
    })

    await expect(promise).rejects.toThrow(UserAlreadyExistsError)
  })
})
