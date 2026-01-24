import { ref, computed, onMounted } from 'vue'
import { getCurrentUser } from '../services/get-user'
import { showError } from '@/utils/show-error'
import { toast } from 'vue-sonner'
import { Route } from '@/router/types/routes'
import { useRouter } from 'vue-router'
import { routes } from '@/router'
import type { UserNoPassword } from 'shared'
import { loginMutation } from '../api/mutations/login'
import { logoutMutation } from '../api/mutations/logout'
import { signUpMutation } from '../api/mutations/sign-up'

const user = ref<UserNoPassword | null>(null)
const isAuthenticated = computed(() => !!user.value)
const isLoading = ref(false)

export const useAuth = () => {
  const router = useRouter()


  // Initialize user data on mount
  onMounted(async () => {
    isLoading.value = true
    user.value = await getCurrentUser()
    isLoading.value = false
  })


  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      const result = await loginMutation({
        email,
        password,
      })

      user.value = result || null
      
      if (user.value) {
        toast.success('Login successful')
        router.push({ name: Route.HOME.toLowerCase() })
      }
    } catch (error) {
      showError('Login failed', error)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      await logoutMutation()
      user.value = null
    } catch (error) {
      console.error('Logout failed:', error)
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      isLoading.value = true
      await signUpMutation({
        email,
        password,
      })
      
      router.push(routes[Route.LOGIN].path)
    } catch (error) {
      showError('Sign up failed', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    user: computed(() => user.value),
    isAuthenticated,
    isLoading: computed(() => isLoading.value),
    login,
    logout,
    signUp,
  }
}
