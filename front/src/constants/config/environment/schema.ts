import * as zod from 'zod'

import { appSchema as app } from './app/schema'
import { authSchema as auth } from './auth/schema'

import { Env } from '.'

type EnvSchema = {
  [key in keyof typeof Env]: zod.ZodSchema<(typeof Env)[key]>
}

export const schema: EnvSchema = {
  app,
  auth,
}
