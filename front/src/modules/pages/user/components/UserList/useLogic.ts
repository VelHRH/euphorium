import { useSuspenseQuery } from '@apollo/client'

import { LIST_USERS } from '$modules/graphql'

export const useLogic = () => {
  const {
    data: { users },
  } = useSuspenseQuery(LIST_USERS)

  return { users: users.list }
}
