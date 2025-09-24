"use client"

import { useRegistrationStore } from "@/store/reg-store"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"

export function StepThree() {
  const { formData, errors, isSubmitting, updateFormData, validateStep, setCurrentStep, submitForm } =
    useRegistrationStore()

  const handleSubmit = async () => {
    if (validateStep(3)) {
      await submitForm()
    }
  }

  const handleBack = () => {
    setCurrentStep(2)
  }

  return (
    <div className="space-y-6">
      <FormInput
        label="Password"
        type="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.target.value })}
        error={errors.password}
      />

      <FormInput
        label="Confirm password"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
        error={errors.confirmPassword}
      />

      <div className="flex space-x-4">
        <Button
          onClick={handleBack}
          variant="outline"
          className="flex-1 py-3 rounded-lg font-medium bg-transparent"
          size="lg"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleSubmit}
          className="flex-1 bg-blue-900 hover:bg-blue-950 text-white py-3 rounded-lg font-medium"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </div>
  )
}
