import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  setup: async () => {
    console.log('setup')

    return {
      teardown: async () => {
        console.log('teardown')
      },
    }
  },
  transformMode: 'ssr',
}
