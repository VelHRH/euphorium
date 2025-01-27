import * as yup from 'yup'

export const passwordSchema = yup
  .string()
  .required('Required field')
  .min(8, 'Password must have at least 8 characters')
  .max(64, 'Password must have at most 64 characters')
  .matches(/[0-9]/, 'Must have at least 1 digit character')
  .matches(/[a-z]/, 'Must have at least 1 lowercase character')
  .matches(/[A-Z]/, 'Must have at least 1 uppercase character')
  .matches(/[#?!@$%^&*-.,;:]/, 'Must have at least 1 special character')
  .test(
    'no-trailing-leading-spaces',
    () => "Your password can't start or end with a blank space",
    (value) => !!value && value.trim() === value,
  )
