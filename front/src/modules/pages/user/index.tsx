import { FC, Suspense } from 'react'

import { UserList } from './components/UserList'

export const UsersPage: FC = () => {
  return (
    <div className="p-3 max-w-800px mx-auto">
      <p className="text-2xl font-bold">All users</p>
      <Suspense fallback={<p>Loading...</p>}>
        <UserList />
      </Suspense>
    </div>
  )
}
