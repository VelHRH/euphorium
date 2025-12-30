<script setup lang="ts">
import { useAuth } from '../composables/use-auth'

const { login } = useAuth()

const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault()
  const eTarget = e.target as HTMLFormElement
  const email = eTarget.email.value
  const password = eTarget.password.value
  await login(email, password)
}

const gogleAuthUrl = `${import.meta.env.VITE_API_URL}/auth/google`
</script>

<template>
  <div class="p-3 max-w-800px mx-auto">
    <div class="flex flex-col gap-2 items-center justify-center">
      <p class="text-2xl font-bold">Login</p>
      <form class="flex flex-col gap-2" @submit="handleSubmit">
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" />
        <button type="submit">Login</button>
        <a :href="gogleAuthUrl">Continue with Google</a>
      </form>
    </div>
  </div>
</template>
