import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib'

describe('Create Check-In [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Academia do Zé',
        description: 'A melhor academia da cidade',
        phone: '123456789',
        latitude: -21.7855024,
        longitude: -46.5626038,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        latitude: -21.7855024,
        longitude: -46.5626038,
      })

    expect(response.statusCode).toBe(201)
  })
})
