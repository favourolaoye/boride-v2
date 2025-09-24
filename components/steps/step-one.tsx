"use client"

import { useRegistrationStore } from "@/store/reg-store"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function StepOne() {
  const { formData, errors, updateFormData, validateStep, setCurrentStep } = useRegistrationStore()

  const handleNext = () => {
    if (validateStep(1)) {
      setCurrentStep(2)
    }
  }

  return (
    <div className="space-y-6">
      <FormInput
        label="Full name"
        type="text"
        placeholder="Enter your full name"
        value={formData.fullname}
        onChange={(e) => updateFormData({ fullname: e.target.value })}
        error={errors.fullname}
      />

      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        error={errors.email}
      />

      <Button
        onClick={handleNext}
        className="w-full bg-blue-900 hover:bg-blue-950 text-white py-3 rounded-lg font-medium"
        size="lg"
      >
        Next
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
