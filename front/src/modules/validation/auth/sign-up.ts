import * as yup from 'yup'

import { emailSchema } from './email'
import { passwordSchema } from './password'

export const signUpSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
})

export type SignUpFormType = yup.InferType<typeof signUpSchema>
