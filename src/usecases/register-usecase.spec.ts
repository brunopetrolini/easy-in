import { describe, it, expect } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register-usecase'
import { InMemoryUsersRepository } from '@/repositories'
import { UserAlreadyExistsError } from './error'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

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
