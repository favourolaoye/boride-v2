import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export function RegistrationSuccess() {
  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
        <p className="text-gray-600 text-balance max-w-md mx-auto">
          Your account has been successfully created. A verification link has been sent to your email address.
        </p>
      </div>

      {/* Continue Button */}
      <Button asChild className="w-full bg-green-600 hover:bg-green-700">
        <Link href="/student/login">Continue to Login</Link>
      </Button>
    </div>
  )
}
