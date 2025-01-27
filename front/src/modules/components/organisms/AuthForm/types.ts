import { FieldValues } from 'react-hook-form'
import * as yup from 'yup'

import { FormFields } from '$modules/constants/form/types'
import { loginSchema } from '$validation'

export type SignInFormType = yup.InferType<typeof loginSchema>

export type AuthFormProps<FormType extends FieldValues> = {
  onSubmit: (params: FormType) => Promise<void>
  schema: yup.ObjectSchema<FormType>
  inputFields: FormFields<FormType>
}
