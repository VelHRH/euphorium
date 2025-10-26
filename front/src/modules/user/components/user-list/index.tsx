'use client'

import { useLogic } from './use-logic'

export const UserList = () => {
  const { users } = useLogic()

  return users.map(({ id, email }) => (
    <div key={id} className="flex flex-col gap-2">
      <p>{email}</p>
    </div>
  ))
}
