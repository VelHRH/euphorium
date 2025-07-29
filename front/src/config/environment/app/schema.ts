import * as zod from 'zod'

export const appSchema = zod.object({
  NEXT_PUBLIC_API_URL: zod.string(),
  NEXT_PUBLIC_APP_URL: zod.string(),
  IS_PRODUCTION: zod.boolean(),
})

export type AppSchema = zod.infer<typeof appSchema>
