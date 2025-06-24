import { yupResolver } from '@hookform/resolvers/yup'
import {
  DefaultValues,
  FieldValues,
  FormSubmitHandler,
  Resolver,
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
    resolver: yupResolver(schema) as unknown as Resolver<FormType>,
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
