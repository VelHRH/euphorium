import { createI18n } from 'vue-i18n'
import en, { type MessageSchema } from './locales/en'
import uk from './locales/uk'

export enum Locale {
  EN = 'EN',
  UK = 'UK',
}

export const defaultLocale: Locale = Locale.EN
export const supportedLocales: Locale[] = [Locale.EN, Locale.UK]

const i18n = createI18n<MessageSchema, Locale>({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    [Locale.EN]: en,
    [Locale.UK]: uk,
  },
})

export default i18n
