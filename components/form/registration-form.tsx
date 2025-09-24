import { useRegistrationStore } from "@/store/reg-store"
import { StepIndicator } from "@/components/form/step-indicator"
import { StepOne } from "@/components/steps/step-one"
import { StepTwo } from "@/components/steps/step-two"
import { StepThree } from "@/components/steps/step-three"
import { RegistrationSuccess } from "@/components/form/registration-success"
import Link from "next/link"
import Image from "next/image"

export function RegistrationForm() {
  const { currentStep, isSuccess } = useRegistrationStore()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      default:
        return <StepOne />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {isSuccess ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <RegistrationSuccess />
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-3">
                <Image src="/boride-black-crop.png" width={100} height={100} alt="boride" className="object-cover" priority/>
              </div>
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create account</h1>
                <p className="text-gray-600">Join the community to get safe and affordable rides.</p>
              </div>

              <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 md:p-8">
                <div className=""><StepIndicator currentStep={currentStep} totalSteps={3} /></div>
                {renderStep()}
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/student/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
