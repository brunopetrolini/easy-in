import { beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateUseCase } from './authenticate-usecase'
import { InMemoryUsersRepository } from '@/repositories'
import { randomUUID } from 'crypto'
import { InvalidCredentialsError } from './error'

describe('Authenticate Use Case', () => {
  const usersRepository = new InMemoryUsersRepository()

  beforeAll(async () => {
    const passwordHash = await hash('any_password', 6)

    await usersRepository.insert({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@mail.com',
      passwordHash,
      createdAt: new Date(),
    })
  })

  it('should be able to authenticate an user', async () => {
    const sut = new AuthenticateUseCase(usersRepository)

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: 'any_password',
    })

    expect(user.id).toStrictEqual(expect.any(String))
  })

  it('should not be able to authenticate an user with wrong email', async () => {
    const sut = new AuthenticateUseCase(usersRepository)

    const promise = sut.execute({
      email: 'wrongemail@mail.com',
      password: 'any_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an user with wrong password', async () => {
    const sut = new AuthenticateUseCase(usersRepository)

    const promise = sut.execute({
      email: 'johndoe@mail.com',
      password: 'wrong_password',
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
