import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Academia do Zé',
        description: 'A melhor academia da cidade',
        phone: '123456789',
        latitude: -21.7855024,
        longitude: -46.5626038,
      })

    expect(response.statusCode).toBe(201)
  })
})
