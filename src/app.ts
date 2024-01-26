import fastify from 'fastify'
import { appRoutes } from './http'

const app = fastify()

app.register(appRoutes)

export { app }
