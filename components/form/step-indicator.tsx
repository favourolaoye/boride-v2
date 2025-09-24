import { Check, Mail } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: "Info" },
    { number: 2, label: "Contact" },
    { number: 3, label: "Password" },
  ]

  return (
    <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  currentStep > step.number
                    ? "bg-blue-600 text-white"
                    : currentStep === step.number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                }
              `}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : step.number === 3 ? (
                <Mail className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`
                text-xs md:text-sm font-medium
                ${currentStep >= step.number ? "text-gray-800" : "text-gray-500"}
              `}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`
                w-8 md:w-16 h-0.5 mx-2 md:mx-4
                ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}
              `}
            />
          )}
        </div>
      ))}
    </div>
  )
}
