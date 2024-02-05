import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Profile [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'JohnDoe123',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@mail.com',
      password: 'JohnDoe123',
    })

    const { access_token: accessToken } = authResponse.body

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
  })
})
