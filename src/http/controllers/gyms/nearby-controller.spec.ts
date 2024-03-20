import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('List Nearby Gym [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gym', async () => {
    const { accessToken } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Academia do Zé',
        description: 'A melhor academia da cidade',
        phone: '123456789',
        latitude: -21.7849557,
        longitude: -46.5616009,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Academia do João',
        description: 'A melhor academia da cidade',
        phone: '123456789',
        latitude: -21.9208263,
        longitude: -46.389302,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -21.7849557,
        longitude: -46.5616009,
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Academia do Zé',
      }),
    ])
  })
})
