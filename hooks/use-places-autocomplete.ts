"use client"

import { useState, useCallback } from "react"

interface PlaceSuggestion {
  id: string
  description: string
  place_id: string
}

export function usePlacesAutocomplete() {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [loading, setLoading] = useState(false)

  const getSuggestions = useCallback(async (input: string) => {
    if (!input || input.length < 2) {
      setSuggestions([])
      return
    }

    setLoading(true)

    try {
      // Call your Next.js API route instead of Google directly
      const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(input)}`)
      const data = await response.json()

      if (data.predictions && data.status === "OK") {
        setSuggestions(
          data.predictions.map((p: any) => ({
            id: p.place_id,
            description: p.description,
            place_id: p.place_id,
          }))
        )
      } else {
        console.error("Places API error:", data.status, data.error_message)
        setSuggestions([])
      }
    } catch (error) {
      console.error("Failed to get suggestions:", error)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    suggestions,
    loading,
    getSuggestions,
  }
}
