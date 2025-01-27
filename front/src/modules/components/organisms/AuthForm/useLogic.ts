import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import {
  FieldValues,
  FormSubmitHandler,
  Resolver,
  useForm,
} from 'react-hook-form'

import { Routes } from '$config'

import { AuthFormProps } from './types'

export const useLogic = <FormType extends FieldValues>(
  params: Pick<AuthFormProps<FormType>, 'onSubmit' | 'schema'>,
) => {
  const { onSubmit, schema } = params
  const router = useRouter()
  const redirectToRegister = () => router.push(Routes.SIGN_UP.url)

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

    onSubmit({ ...data, email: data.email.trim() })
  }

  return {
    control,
    onFormSubmit,
    redirectToRegister,
    isValid,
  }
}
