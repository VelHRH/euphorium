<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FormConfig } from '@/types/form-config'
import { z } from 'zod'
import type { z as ZodType } from 'zod'
import { useForm } from '@vuehookform/core'
import Dialog from '../ui/dialog/Dialog.vue'
import DialogTrigger from '../ui/dialog/DialogTrigger.vue'
import DialogContent from '../ui/dialog/DialogContent.vue'
import DialogHeader from '../ui/dialog/DialogHeader.vue'
import DialogTitle from '../ui/dialog/DialogTitle.vue'
import DialogFooter from '../ui/dialog/DialogFooter.vue'
import Input from '../ui/input/Input.vue'
import { Button } from '../ui/button'

const props = defineProps<{
  formConfig: FormConfig
  schema?: ZodType.ZodTypeAny
  title?: string
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: [data: Record<string, unknown>, onSuccess: () => void, onError: (error: unknown) => void]
}>()

const isOpen = ref(false)

// Initialize default values from form config
const defaultValues = computed(() => {
  return Object.keys(props.formConfig).reduce(
    (acc, key) => {
      acc[key] = ''
      return acc
    },
    {} as Record<string, unknown>
  )
})

// Preprocess schema to transform date strings to Date objects
function preprocessSchema(schema: ZodType.ZodTypeAny): ZodType.ZodTypeAny {
  // Wrap the schema with preprocessing to transform date strings to Date objects
  return z.preprocess(data => {
    if (!data || typeof data !== 'object') return data

    const transformed = { ...(data as Record<string, unknown>) }

    // Transform date fields from strings to Date objects
    Object.entries(props.formConfig).forEach(([key, config]) => {
      if (config.type === 'date' && transformed[key]) {
        const value = transformed[key]
        // Only transform if it's a string and not already a Date
        if (typeof value === 'string' && value) {
          const dateValue = new Date(value)
          // Only use the Date if it's valid
          if (!isNaN(dateValue.getTime())) {
            transformed[key] = dateValue
          }
        }
      }
    })

    return transformed
  }, schema)
}

// Create a minimal schema if none provided (for basic validation)
const formSchema = computed(() => {
  if (props.schema) {
    // Preprocess the schema to handle date string to Date conversion
    return preprocessSchema(props.schema)
  }

  // Create a basic Zod schema from form config for required fields
  const shape: Record<string, ZodType.ZodTypeAny> = {}
  Object.entries(props.formConfig).forEach(([key, config]) => {
    if (config.type === 'date') {
      shape[key] = config.required
        ? z.string().min(1, `${config.label} is required`)
        : z.string().optional()
    } else {
      shape[key] = config.required
        ? z.string().min(1, `${config.label} is required`)
        : z.string().optional()
    }
  })

  return z.object(shape)
})

// Setup form with useForm
const {
  register,
  handleSubmit: handleFormSubmit,
  formState,
  watch,
} = useForm({
  schema: formSchema.value,
  defaultValues: defaultValues.value,
  mode: 'onBlur',
})

const formFields = computed(() => {
  return Object.entries(props.formConfig).map(([key, config]) => ({
    key,
    ...config,
  }))
})

// Watch form values for real-time updates
const formValues = watch()

// Handle form submission
const onSubmit = handleFormSubmit(data => {
  // Transform date strings to Date objects if schema expects dates
  const transformed = { ...data }
  if (props.schema) {
    formFields.value.forEach(field => {
      if (field.type === 'date' && transformed[field.key]) {
        const dateValue = String(transformed[field.key])
        if (dateValue) {
          transformed[field.key] = new Date(dateValue)
        }
      }
    })
  }

  // Emit submit event with success and error callbacks
  emit(
    'submit',
    transformed,
    // onSuccess: close the dialog
    () => {
      isOpen.value = false
    },
    // onError: parent component handles error display with toast.error
    error => {
      console.error('Form submission error:', error)
    }
  )
})

const isFormValid = computed(() => {
  // First check that all required fields have values
  const hasAllRequiredFields = formFields.value.every(field => {
    if (!field.required) return true

    const value = formValues.value[field.key]
    // Check if required field has a value
    if (value === '' || value === null || value === undefined) {
      return false
    }

    // For date fields, ensure the string is not empty
    if (field.type === 'date' && typeof value === 'string' && !value.trim()) {
      return false
    }

    return true
  })

  // If required fields aren't filled, form is invalid
  if (!hasAllRequiredFields) {
    return false
  }

  // Then check if form is valid according to schema (no validation errors)
  return formState.value.isValid
})

const formErrors = computed(() => {
  return formState.value.errors || {}
})

// Helper to get error message
function getErrorMessage(fieldKey: string): string | undefined {
  const error = formErrors.value[fieldKey]
  if (!error) return undefined

  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return error.message as string
  }

  return undefined
}

// Helper to check if field has error
function hasError(fieldKey: string): boolean {
  return !!formErrors.value[fieldKey]
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title || 'Form' }}</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-4">
        <div v-for="field in formFields" :key="field.key" class="space-y-2">
          <label
            :for="field.key"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ field.label }}
            <span v-if="field.required" class="text-destructive">*</span>
          </label>
          <Input
            :id="field.key"
            v-model="formValues[field.key]"
            v-bind="register(field.key)"
            :type="field.type"
            :required="field.required"
            :class="[field.class, hasError(field.key) ? 'border-destructive' : '']"
            :name="field.name"
            :aria-invalid="hasError(field.key) ? 'true' : undefined"
          />
          <p v-if="getErrorMessage(field.key)" class="text-sm text-destructive">
            {{ getErrorMessage(field.key) }}
          </p>
        </div>
        <DialogFooter>
          <Button type="submit" :disabled="!isFormValid">
            {{ submitLabel || 'Submit' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
