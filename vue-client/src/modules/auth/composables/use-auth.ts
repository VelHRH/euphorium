import { ref, computed, onMounted } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { LOGIN, LOGOUT, SIGN_UP } from '../graphql/mutations'
import { getCurrentUser } from '../services/get-user'
import { showError } from '@/utils/show-error'
import { toast } from 'vue-sonner'
import { Route } from '@/router/types/routes'
import { useRouter } from 'vue-router'
import { routes } from '@/router'
import type { UserNoPassword } from 'shared'

const user = ref<UserNoPassword | null>(null)
const isAuthenticated = computed(() => !!user.value)
const isLoading = ref(false)

export const useAuth = () => {
  const router = useRouter()

  const { mutate: logoutMutation } = useMutation(LOGOUT)
  const { mutate: loginMutation } = useMutation(LOGIN)
  const { mutate: signUpMutation } = useMutation(SIGN_UP)

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
        input: {
          email,
          password,
        },
      })
      
      user.value = result?.data?.login.id || null
      
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
        input: {
          email,
          password,
        },
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
