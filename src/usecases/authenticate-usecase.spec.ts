import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateUseCase } from './authenticate-usecase'
import { InMemoryUsersRepository } from '@/repositories'
import type { UsersRepository } from '@/repositories'
import { InvalidCredentialsError } from './error'

describe('Authenticate Use Case', () => {
  let usersRepository: UsersRepository
  let sut: AuthenticateUseCase

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()

    const passwordHash = await hash('any_password', 6)
    await usersRepository.insert({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      passwordHash,
    })

    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate an user', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: 'any_password',
    })

    expect(user.id).toStrictEqual(expect.any(String))
  })

  it('should not be able to authenticate an user with wrong email', async () => {
    const promise = sut.execute({
      email: 'wrongemail@mail.com',
      password: 'any_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an user with wrong password', async () => {
    const promise = sut.execute({
      email: 'johndoe@mail.com',
      password: 'wrong_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
