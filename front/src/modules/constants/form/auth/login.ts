import { LoginFormType } from '$validation'

import { FormFields } from '../types'

export const loginFields: FormFields<LoginFormType> = {
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
