export const gqlRequest = async <Output>(query: string, input?: unknown) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      query,
      variables: {
        input,
      },
    }),
  })
  const { data } = await res.json()
  return data as Output
}
