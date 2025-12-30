<script setup lang="ts">
import { useAuth } from '../composables/use-auth'
import AuthForm from '../components/auth-form.vue'

const { login } = useAuth()
</script>

<template>
  <AuthForm title="Login" @submit="login" />
</template>
