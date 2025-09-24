import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RideBookingForm } from "@/components/dashboard/ride-booking-form"
import { PastRides } from "@/components/dashboard/past-rides"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-rideon-gray">
      <DashboardHeader />

      <main className="px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Hello, Sarah!</h1>
          <p className="text-xl text-rideon-text-muted">Where would you like to go today?</p>
        </div>

        {/* Ride Booking Form */}
        <div className="mb-16">
          <RideBookingForm />
        </div>

        {/* Past Rides */}
        <PastRides />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 bg-white">
        © 2025 RideOn. All rights reserved.
      </footer>
    </div>
  )
}
