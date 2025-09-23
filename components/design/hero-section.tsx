import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-screen pt-20 bg-gradient-to-r from-gray-900/80 to-gray-900/60 flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/students.jpeg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Go anywhere with Boride</h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Request a ride, hop in and go. Visit any destination with ease and comfort.
          </p>
          <Button size="lg" className="text-lg px-8 py-3">
            Order a Ride
          </Button>
        </div>
      </div>
    </section>
  )
}
