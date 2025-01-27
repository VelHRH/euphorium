'use client'

import { useLogic } from './useLogic'

import { UserListItem } from '../UserListItem'

export const UserList = () => {
  const { users } = useLogic()

  return users.map(({ id, email }) => <UserListItem key={id} email={email} />)
}
