import * as yup from 'yup'

export const appSchema = yup.object({
  NEXT_PUBLIC_API_URL: yup.string().required(),
  NEXT_PUBLIC_APP_URL: yup.string().required(),
  IS_PRODUCTION: yup.boolean().required(),
})

export type AppSchema = yup.InferType<typeof appSchema>
