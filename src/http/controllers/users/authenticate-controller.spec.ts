import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'JohnDoe123',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@mail.com',
      password: 'JohnDoe123',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('access_token')
  })
})
