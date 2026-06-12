import { defaultLocale, Locale, supportedLocales } from '@/i18n'
import { useStorage } from '@vueuse/core'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const localeLabels: Record<Locale, string> = {
  [Locale.EN]: 'EN',
  [Locale.UK]: 'UA',
}

let initialized = false

export const useLocale = () => {
  const storedLocale = useStorage<Locale>('locale', defaultLocale)
  const { locale: i18nLocale } = useI18n()

  if (!initialized) {
    initialized = true
    watch(
      storedLocale,
      value => {
        i18nLocale.value = value
        document.documentElement.lang = value
      },
      { immediate: true }
    )
  }

  const setLocale = (newLocale: Locale) => {
    storedLocale.value = newLocale
  }

  return {
    locale: storedLocale,
    localeLabels,
    setLocale,
    supportedLocales,
  }
}
