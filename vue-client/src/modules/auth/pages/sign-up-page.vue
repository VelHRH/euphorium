<script setup lang="ts">
import { useAuth } from '../composables/use-auth'
import AuthForm from '../components/auth-form.vue'

const { signUp } = useAuth()
</script>

<template>
  <AuthForm variant="signUp" @submit="signUp" />
</template>
