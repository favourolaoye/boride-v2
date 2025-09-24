"use client"

import { useState } from "react"
import { MapPin, Navigation, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationInput } from "./location-input"

export function RideBookingForm() {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")

  const handleOrderRide = () => {
    if (!fromLocation || !toLocation) {
      alert("Please enter both pickup and destination locations")
      return
    }

    // In a real app, this would initiate the ride booking process
    console.log("Booking ride from", fromLocation, "to", toLocation)
    alert(`Booking ride from ${fromLocation} to ${toLocation}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
        <LocationInput
          label="From"
          placeholder="Current Location"
          value={fromLocation}
          onChange={setFromLocation}
          showCurrentLocation={true}
          icon={<Navigation className="w-5 h-5" />}
        />

        <LocationInput
          label="To"
          placeholder="Destination"
          value={toLocation}
          onChange={setToLocation}
          icon={<MapPin className="w-5 h-5" />}
        />

        <Button
          onClick={handleOrderRide}
          className="h-12 bg-rideon-blue hover:bg-rideon-blue/90 text-white font-medium text-base px-6"
        >
          <Car className="w-5 h-5 mr-2" />
          Order Ride
        </Button>
      </div>
    </div>
  )
}
