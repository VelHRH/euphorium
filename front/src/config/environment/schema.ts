import * as yup from 'yup'

import { appSchema as app } from './app/schema'
import { authSchema as auth } from './auth/schema'

import { Env } from '.'

type EnvSchema = {
  [key in keyof typeof Env]: yup.ObjectSchema<(typeof Env)[key]>
}

export const schema: EnvSchema = {
  app,
  auth,
}
