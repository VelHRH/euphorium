<script lang="ts" setup>
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input/Input.vue'
import { routes } from '@/router'
import { Route } from '@/router/types/routes'
import { RouterLink } from 'vue-router'
const { title, isCreateAccountBtn } = defineProps<{
  title: string
  isCreateAccountBtn?: boolean
}>()

const emit = defineEmits<{
  submit: [email: string, password: string]
}>()

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
        <Input name="email" placeholder="Email" class="w-full" />
        <Input name="password" placeholder="Password" />
        <div class="flex gap-2 w-full">
          <Button type="submit" class="w-1/2">{{ title }}</Button>
          <Button @click="handleGoogleAuth" variant="outline" class="flex-1"
            ><IconGoogle class="size-6" />Continue with Google</Button
          >
        </div>
      </form>
      <RouterLink
        v-if="isCreateAccountBtn"
        class="text-sm text-gray-500"
        :to="routes[Route.SIGN_UP].path"
        >Create an account</RouterLink
      >
      <RouterLink v-else class="text-sm text-gray-500" :to="routes[Route.LOGIN].path"
        >Already have an account? Login</RouterLink
      >
    </div>
  </div>
</template>
