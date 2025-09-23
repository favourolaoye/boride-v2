import { Navbar } from "@/components/design/navbar"
import { FeaturesSection } from "@/components/design/features-section"
import { TestimonialsSection } from "@/components/design/testimonial-section"
import { Footer } from "@/components/design/footer"
import { HeroSection } from "@/components/design/hero-section"
import { QuoteSection } from "@/components/design/qoute-section"
import { TeamSection } from "@/components/design/team-section"

export default function Home() {
  return (
    <main className="min-h-screen font-inter">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <QuoteSection />
      <TeamSection />
      <TestimonialsSection />
      {/* <Footer /> */}
    </main>
  )
}
