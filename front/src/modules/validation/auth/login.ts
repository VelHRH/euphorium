import * as yup from 'yup'

import { emailSchema } from './email'
import { passwordSchema } from './password'

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginFormType = yup.InferType<typeof loginSchema>
