export type FormConfig = Record<string, {
  name: string
  label: string
  type: string,
  required?: boolean
  class?: string
}>