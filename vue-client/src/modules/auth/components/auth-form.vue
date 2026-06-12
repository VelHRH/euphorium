<script lang="ts" setup>
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input/Input.vue'
import { routes } from '@/router'
import { Route } from '@/router/types/routes'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { variant } = defineProps<{
  variant: 'login' | 'signUp'
}>()

const emit = defineEmits<{
  submit: [email: string, password: string]
}>()

const { t } = useI18n()

const title = computed(() =>
  variant === 'login' ? t('auth.login.title') : t('auth.signUp.title'),
)

function handleSubmit(e: SubmitEvent) {
  e.preventDefault()
  const eTarget = e.target as HTMLFormElement
  const email = eTarget.email.value
  const password = eTarget.password.value
  emit('submit', email, password)
}

const gogleAuthUrl = `${import.meta.env.VITE_API_URL}/auth/google`

function handleGoogleAuth() {
  window.location.href = gogleAuthUrl
}
</script>

<template>
  <div class="flex flex-col pt-40 h-screen">
    <div class="w-1/2 lg:w-1/3 mx-auto flex flex-col gap-4 items-center justify-center">
      <p class="text-2xl font-bold mb-2">{{ title }}</p>
      <form class="flex flex-col gap-4 w-full" @submit="handleSubmit">
        <Input name="email" :placeholder="t('auth.email')" class="w-full" />
        <Input name="password" :placeholder="t('auth.password')" />
        <div class="flex gap-2 w-full">
          <Button type="submit" class="w-1/2">{{ title }}</Button>
          <Button @click="handleGoogleAuth" variant="outline" class="flex-1"
            ><IconGoogle class="size-6" />{{ t('auth.google') }}</Button
          >
        </div>
      </form>
      <RouterLink
        v-if="variant === 'login'"
        class="text-sm text-gray-500"
        :to="routes[Route.SIGN_UP].path"
        >{{ t('auth.login.createAccount') }}</RouterLink
      >
      <RouterLink v-else class="text-sm text-gray-500" :to="routes[Route.LOGIN].path">{{
        t('auth.signUp.hasAccount')
      }}</RouterLink>
    </div>
  </div>
</template>
