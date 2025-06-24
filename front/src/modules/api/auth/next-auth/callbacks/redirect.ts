import { AuthOptions } from 'next-auth'

export const redirectCallback: Required<AuthOptions>['callbacks']['redirect'] =
  (params) => {
    const { url, baseUrl } = params

    if (url.startsWith('/')) {
      return baseUrl.concat(url)
    }

    const urlObject = new URL(url)
    const callbackUrl = urlObject.searchParams.get('callbackUrl')

    if (urlObject.origin === baseUrl) {
      return callbackUrl || url
    }

    return baseUrl.concat(url)
  }
