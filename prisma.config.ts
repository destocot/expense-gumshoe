import path from 'node:path'
import type { PrismaConfig } from 'prisma'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import 'dotenv/config'

type Env = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
}

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),

  migrate: {
    async adapter(env) {
      return new PrismaLibSQL({
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,
      })
    },
  },
} satisfies PrismaConfig<Env>
