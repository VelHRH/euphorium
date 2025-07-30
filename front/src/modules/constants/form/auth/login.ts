import { LoginInput } from 'shared'

import { FormFields } from '../types'

export const loginFields: FormFields<LoginInput> = {
  email: {
    name: 'email',
    label: 'Enter email',
    type: 'text',
  },
  password: {
    name: 'password',
    label: 'Enter password',
    type: 'password',
  },
}
