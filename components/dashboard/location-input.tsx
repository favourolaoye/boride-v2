"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLocation } from "@/hooks/use-location"
import { usePlacesAutocomplete } from "@/hooks/use-places-autocomplete"
import { cn } from "@/lib/utils"

interface LocationInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  showCurrentLocation?: boolean
  icon?: React.ReactNode
}

export function LocationInput({
  label,
  placeholder,
  value,
  onChange,
  showCurrentLocation = false,
  icon,
}: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { address, loading: locationLoading, getCurrentLocation } = useLocation()
  const { suggestions, loading: suggestionsLoading, getSuggestions } = usePlacesAutocomplete()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (address && showCurrentLocation) {
      setInputValue(address)
      onChange(address)
    }
  }, [address, showCurrentLocation, onChange])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue)

    if (newValue.length >= 2) {
      getSuggestions(newValue)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const handleSuggestionClick = (description: string) => {
    setInputValue(description)
    onChange(description)
    setIsOpen(false)
  }

  const handleCurrentLocationClick = () => {
    getCurrentLocation()
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon || <MapPin className="w-5 h-5" />}
        </div>

        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (inputValue.length >= 2) {
              getSuggestions(inputValue)
              setIsOpen(true)
            }
          }}
          className="pl-10 pr-12 h-12 text-base"
        />

        {showCurrentLocation && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCurrentLocationClick}
            disabled={locationLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
          >
            <Navigation className={cn("w-4 h-4", locationLoading && "animate-spin")} />
          </Button>
        )}
      </div>

      {isOpen && (suggestions.length > 0 || suggestionsLoading) && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestionsLoading ? (
            <div className="p-3 text-sm text-gray-500">Loading suggestions...</div>
          ) : (
            suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion.description)}
                className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
              >
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-900">{suggestion.description}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
