import * as zod from 'zod'

export const authSchema = zod.object({
  NEXTAUTH_URL: zod.string(),
  NEXTAUTH_SECRET: zod.string(),
})

export type AuthSchema = zod.infer<typeof authSchema>
