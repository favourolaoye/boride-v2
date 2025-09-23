"use client"

import { useRegistrationStore } from "@/store/reg-store"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"

export function StepTwo() {
  const { formData, errors, updateFormData, validateStep, setCurrentStep } = useRegistrationStore()

  const handleNext = () => {
    if (validateStep(2)) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  return (
    <div className="space-y-6">
      <FormInput
        label="Phone number"
        type="tel"
        placeholder="Enter your phone number"
        value={formData.phoneNo}
        onChange={(e) => updateFormData({ phoneNo: e.target.value })}
        error={errors.phoneNo}
      />

      <FormInput
        label="Student ID"
        type="text"
        placeholder="25/CSC/0456"
        value={formData.studentId}
        onChange={(e) => updateFormData({ studentId: e.target.value.toUpperCase() })}
        error={errors.studentId}
      />

      <div className="flex space-x-4">
        <Button
          onClick={handleBack}
          variant="outline"
          className="flex-1 py-3 rounded-lg font-medium bg-transparent"
          size="lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
          size="lg"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
