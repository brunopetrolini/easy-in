import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'JohnDoe123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@mail.com',
    password: 'JohnDoe123',
  })

  return { accessToken: authResponse.body.access_token }
}
