<script lang="ts" setup>
import { Button } from '@/components/ui/button'
const { title } = defineProps<{
  title: string
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
</script>

<template>
    <div class="p-3 max-w-800px mx-auto">
    <div class="flex flex-col gap-2 items-center justify-center">
      <p class="text-2xl font-bold">{{ title }}</p>
      <form class="flex flex-col gap-2" @submit="handleSubmit">
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" />
        <Button type="submit">{{ title }}</Button>
        <a :href="gogleAuthUrl">Continue with Google</a>
      </form>
    </div>
  </div>
</template>