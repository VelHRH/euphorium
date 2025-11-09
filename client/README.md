## Apollo Client

There are 3 fundamentally different ways to use Apollo Client in Next.js applications:

### 1. useQuery and client components

It enables all caching capabilities, but it is not the most optimal way, because all fetching will take place on the user's machine. JS-bundle must first be loaded to browser, and only then fetching happens. Even though it's not the fastest way, it still pretty robust and easy to implement:

```typescript
const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
})
```

### 2. Promises and server сomponents

`await client.query()` enables fetching on the server, but has obvious disadvantages like the impossibility of caching queries by Apollo and the fact that fetching on the server does not necessarily mean faster. [More about caveats](https://github.com/reactwg/react-18/discussions/37).

### 3. Suspense

Suspense component allows to fetch on server in a really optimal way. You definitely want to use it for server components. Moreover, Suspense can be used for client components as well thanks to the `useSuspenceQuey` hook. But this is the tricky part! The problem is that even when in a client component, useSuspenceQuery will fetch data on the server (that's the whole point of Suspence). So if you try to make a query that requires a cookie, the browser won't be able to do it for you. If you just try to use useSuspenceQuery instead of useQuery in a client component, the data will still be fetched, but you'll see a nasty error in the console:

![image_2025-01-26_13-40-14](https://github.com/user-attachments/assets/5e296da3-71ff-44c5-93ac-9efbdbf8dac6)

This means that fetching failed on the server due to an authorization error, but Next.js automatically repeated the request on the client, so the data is there. Still, the whole point of Suspense and its optimizations is lost! The only workaround is to add cookies manually on the server. This way, the perfect balance is achieved by combining SSR, Apollo cashing and Suspense. Therefore, this is the approach we use in the project.
