import { create } from "zustand"
 import axios from "axios"
export interface FormData {
  // Step 1: Personal Info
  fullname: string
  email: string

  // Step 2: Contact & ID
  phoneNo: string
  studentId: string

  // Step 3: Password
  password: string
  confirmPassword?: string
}

export interface FormErrors {
  fullname?: string
  email?: string
  phoneNo?: string
  studentId?: string
  password?: string
  confirmPassword?: string
}

interface RegistrationStore {
  currentStep: number
  formData: FormData
  errors: FormErrors
  isSubmitting: boolean
  isSuccess: boolean

  // Actions
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<FormData>) => void
  setErrors: (errors: FormErrors) => void
  setSubmitting: (isSubmitting: boolean) => void
  setSuccess: (isSuccess: boolean) => void
  resetForm: () => void

  // Validation
  validateStep: (step: number) => boolean
  submitForm: () => Promise<void>
}

const initialFormData: FormData = {
  fullname: "",
  email: "",
  phoneNo: "",
  studentId: "",
  password: ""
}
 const API_URL = process.env.NEXT_PUBLIC_API_URL
export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
  currentStep: 1,
  formData: initialFormData,
  errors: {},
  isSubmitting: false,
  isSuccess: false,

  setCurrentStep: (step) => set({ currentStep: step }),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
      errors: {}, 
    })),

  setErrors: (errors) => set({ errors }),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  setSuccess: (isSuccess) => set({ isSuccess }),

  resetForm: () =>
    set({
      currentStep: 1,
      formData: initialFormData,
      errors: {},
      isSubmitting: false,
      isSuccess: false,
    }),

  validateStep: (step) => {
    const { formData } = get()
    const errors: FormErrors = {}

    if (step === 1) {
      if (!formData.fullname.trim()) {
        errors.fullname = "Full name is required"
      }
      if (!formData.email.trim()) {
        errors.email = "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Please enter a valid email address"
      }
    }

    if (step === 2) {
      if (!formData.phoneNo.trim()) {
        errors.phoneNo = "Phone number is required"
      } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phoneNo)) {
        errors.phoneNo = "Please enter a valid phone number"
      }

      if (!formData.studentId.trim()) {
        errors.studentId = "Student ID is required"
      } else if (!/^\d{2}\/[A-Z]{3}\/\d{4}$/.test(formData.studentId)) {
        errors.studentId = "Student ID must match format: 25/CSC/0456"
      }
    }

    if (step === 3) {
      if (!formData.password) {
        errors.password = "Password is required"
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
      }
      if (formData.password !== formData.confirmPassword){
        errors.confirmPassword = "passwords must match"
      }
    }

    set({ errors })
    return Object.keys(errors).length === 0
  },



submitForm: async () => {
  const { formData, validateStep } = get()
 ;
  // Validate all steps
  const isValid = validateStep(1) && validateStep(2) && validateStep(3)
  if (!isValid) return

  set({ isSubmitting: true })

  try {
    const response = await axios.post(`${API_URL}/api/student/register`, formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const  {msg, regStatus} = response.data;

    if (!regStatus) {
      throw new Error("Registration failed")
    }

    set({ isSuccess: true })
  } catch (error: any) {
    console.error("Registration error:", error)
    set({
      errors: {
        email:
          error.response?.data?.msg ||
          "Registration failed. Please try again.",
      },
    })
  } finally {
    set({ isSubmitting: false })
  }
},

}))
