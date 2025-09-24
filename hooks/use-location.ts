"use client"

import { useState } from "react"

interface LocationState {
  latitude: number | null
  longitude: number | null
  address: string | null
  loading: boolean
  error: string | null
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    address: null,
    loading: false,
    error: null,
  })

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, error: "Geolocation is not supported" }))
      return
    }

    setLocation((prev) => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const address = await reverseGeocode(latitude, longitude)

          setLocation({
            latitude,
            longitude,
            address,
            loading: false,
            error: null,
          })
        } catch (error) {
          setLocation((prev) => ({
            ...prev,
            latitude,
            longitude,
            loading: false,
            error: "Failed to get address",
          }))
        }
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  return {
    ...location,
    getCurrentLocation,
  }
}

// 🔑 Calls your Next.js API route instead of Google directly
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`)
  const data = await response.json()

  if (data.status !== "OK" || !data.results.length) {
    throw new Error("No address found")
  }

  return data.results[0].formatted_address
}
