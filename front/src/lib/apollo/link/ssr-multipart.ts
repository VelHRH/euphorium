import { SSRMultipartLink } from '@apollo/experimental-nextjs-app-support'

export const ssrMultipartLink = new SSRMultipartLink({
  stripDefer: true,
})
