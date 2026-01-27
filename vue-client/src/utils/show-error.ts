import { toast } from 'vue-sonner'

export const showError = (text: string, error?: unknown) => {
  console.error(text, error)
  toast.error(text)
}
