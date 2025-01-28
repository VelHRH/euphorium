import { yupResolver } from '@hookform/resolvers/yup'
import {
  FieldValues,
  FormSubmitHandler,
  Resolver,
  useForm,
} from 'react-hook-form'

import { AuthFormProps } from './types'

export const useLogic = <FormType extends FieldValues>(
  params: Pick<AuthFormProps<FormType>, 'onSubmit' | 'schema'>,
) => {
  const { onSubmit, schema } = params

  const {
    control,
    formState: { isValid },
  } = useForm<FormType>({
    resolver: yupResolver(schema) as unknown as Resolver<FormType>,
    mode: 'onChange',
    reValidateMode: 'onChange',
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
