import type { FormConfig } from '@/types/form-config'

export const CREATE_FESTIVAL_FORM: FormConfig = {
  name: {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  dateStart: {
    name: 'dateStart',
    label: 'Date Start',
    type: 'date',
    required: true,
  },
  dateEnd: {
    name: 'dateEnd',
    label: 'Date End',
    type: 'date',
    required: true,
  },
}