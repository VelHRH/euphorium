<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { Locale } from '@/i18n'
import { useLocale } from '@/i18n/composables/use-locale'
import { Languages } from 'lucide-vue-next'

const { locale, localeLabels, setLocale, supportedLocales } = useLocale()

const toggleLocale = () => {
  const currentIndex = supportedLocales.indexOf(locale.value)
  const nextLocale = supportedLocales[(currentIndex + 1) % supportedLocales.length] as Locale
  setLocale(nextLocale)
}
</script>

<template>
  <Button
    variant="ghost"
    size="sm"
    class="gap-1.5 font-medium"
    :title="localeLabels[locale]"
    @click="toggleLocale"
  >
    <Languages class="size-4" />
    {{ localeLabels[locale] }}
  </Button>
</template>
