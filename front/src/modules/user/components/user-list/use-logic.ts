import { LIST_USERS } from '$api/user/querries/list'
import { useSuspenseQuery } from '@apollo/client/react'

export const useLogic = () => {
  const {
    data: { users },
  } = useSuspenseQuery(LIST_USERS)

  return { users: users.list }
}
