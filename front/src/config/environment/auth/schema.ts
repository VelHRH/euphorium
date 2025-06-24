import * as yup from 'yup'

export const authSchema = yup.object({
  NEXTAUTH_URL: yup.string().required(),
  NEXTAUTH_SECRET: yup.string().required(),
})

export type AuthSchema = yup.InferType<typeof authSchema>
