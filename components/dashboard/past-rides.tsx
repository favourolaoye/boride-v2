"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { Car } from "lucide-react" 

interface Ride {
  id: string
  from: string
  to: string
  date: string
  time: string
  price: string
}

const mockRides: Ride[] = [
  {
    id: "1",
    from: "Campus Library",
    to: "Downtown",
    date: "Oct 26, 2023",
    time: "3:45 PM",
    price: "$12.50",
  },
  {
    id: "2",
    from: "Student Union",
    to: "North Hall",
    date: "Oct 25, 2023",
    time: "9:15 AM",
    price: "$7.00",
  },
  {
    id: "3",
    from: "Off-Campus Housing",
    to: "Main St",
    date: "Oct 23, 2023",
    time: "7:30 PM",
    price: "$15.25",
  },
]

export function PastRides() {
  const [showAll, setShowAll] = useState(false)
  const rides = mockRides // In a real app, this would come from an API

  if (rides.length === 0) {
    return (
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Past Rides</h2>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">Nothing to see here yet</p>
          <p className="text-gray-400 text-sm mt-1">Your ride history will appear here</p>
        </div>
      </section>
    )
  }

  const displayedRides = showAll ? rides : rides.slice(0, 3)

  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Past Rides</h2>
        {rides.length > 3 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="text-rideon-blue hover:text-rideon-blue/80"
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {displayedRides.map((ride) => (
          <div
            key={ride.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-rideon-blue" />
              </div>

              <div>
                <h3 className="font-medium text-gray-900">
                  {ride.from} to {ride.to}
                </h3>
                <p className="text-sm text-gray-500">
                  {ride.date} - {ride.time}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">{ride.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
