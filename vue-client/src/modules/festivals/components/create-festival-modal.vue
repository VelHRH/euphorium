<script setup lang="ts">
import ModalForm from '@/components/organisms/modal-form.vue'
import { CREATE_FESTIVAL_FORM } from '../constants/forms/festiaval'
import { createFestivalInputSchema, type CreateFestivalInput  } from 'shared'
import { createFestivalMutation } from '../api/mutations/create-festival'
import { useFetchFestivals } from '../hooks/use-fetch-festivals'
import { useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { showError } from '@/utils/show-error'
import { PlusCircleIcon } from 'lucide-vue-next'

const queryClient = useQueryClient()
const { refetch } = useFetchFestivals()

async function handleSubmit(
  data: Record<string, unknown>,
  onSuccess: () => void,
  onError: (error: unknown) => void
) {
  try {
    const transformedData: CreateFestivalInput = {
      name: String(data.name),
      dateStart: data.dateStart instanceof Date 
        ? data.dateStart 
        : new Date(String(data.dateStart)),
      dateEnd: data.dateEnd instanceof Date 
        ? data.dateEnd 
        : new Date(String(data.dateEnd)),
      imgPaths: Array.isArray(data.imgPaths) 
        ? (data.imgPaths as string[])
        : data.imgPaths 
          ? [String(data.imgPaths)]
          : [],
    }
    
    await createFestivalMutation(transformedData)
    toast.success('Festival created successfully')
    
    // Invalidate and refetch festivals
    await queryClient.invalidateQueries({ queryKey: ['festivals'] })
    await refetch()
    
    // Call success callback to close the dialog
    onSuccess()
  } catch (error) {
    // Show error toast
    showError('Failed to create festival', error)
    // Call error callback
    onError(error)
  }
}
</script>

<template>
  <ModalForm
    :form-config="CREATE_FESTIVAL_FORM"
    :schema="createFestivalInputSchema"
    title="Create Festival"
    submit-label="Create"
    @submit="handleSubmit"
  >
    <template #trigger>
      <PlusCircleIcon
        class="w-10 h-10 text-neon-purple cursor-pointer hover:text-neon-purple/80 transition-colors duration-300"
      />
    </template>
  </ModalForm>
</template>

