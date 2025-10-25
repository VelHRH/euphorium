import { useSuspenseQuery } from '@apollo/client'

import { LIST_USERS } from '$/lib/graphql'

export const useLogic = () => {
  const {
    data: { users },
  } = useSuspenseQuery(LIST_USERS)

  return { users: users.list }
}
