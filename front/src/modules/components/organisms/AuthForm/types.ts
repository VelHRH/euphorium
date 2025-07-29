import { FieldValues } from 'react-hook-form'

import { FormFields } from '$modules/constants/form/types'

export type AuthFormProps<FormType extends FieldValues> = {
  onSubmit: (params: FormType) => Promise<void>
  schema: any
  inputFields: FormFields<FormType>
}
