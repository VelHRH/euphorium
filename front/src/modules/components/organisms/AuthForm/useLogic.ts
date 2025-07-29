import { zodResolver } from '@hookform/resolvers/zod'
import {
  DefaultValues,
  FieldValues,
  FormSubmitHandler,
  useForm,
} from 'react-hook-form'

import { AuthFormProps } from './types'

export const useLogic = <FormType extends FieldValues>(
  params: AuthFormProps<FormType>,
) => {
  const { onSubmit, schema, inputFields } = params

  const defaultValues = Object.fromEntries(
    Object.values(inputFields).map(({ name }) => [name, '']),
  ) as DefaultValues<FormType>

  const {
    control,
    formState: { isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  })

  const onFormSubmit: FormSubmitHandler<FormType> = ({ event, data }) => {
    event?.preventDefault()
    onSubmit(data)
  }

  return {
    control,
    onFormSubmit,
    isValid,
  }
}
