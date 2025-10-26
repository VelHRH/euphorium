import { FieldValues } from 'react-hook-form'

import { InputProps } from '$components/molecules/Input/types'

export type FormFields<FormType extends FieldValues> = Record<
  keyof FormType,
  Pick<InputProps<FormType>, 'name' | 'label' | 'type'>
>
