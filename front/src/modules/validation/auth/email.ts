import isEmailValidator from 'validator/lib/isEmail'
import * as yup from 'yup'

export const emailSchema = yup
  .string()
  .trim()
  .min(6)
  .max(254, 'Email must have at most 255 characters')
  .test(
    'is-valid',
    () => 'Must be valid email',
    (value) =>
      value
        ? isEmailValidator(value)
        : new yup.ValidationError('Invalid value'),
  )
  .required('Required field')
