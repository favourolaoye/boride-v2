import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Car } from "lucide-react"
import Link from "next/link"
export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Students */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="mb-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Get to your classes, meetings, or anywhere on campus safely and on time.
                </p>
                <Link href="/student/register">
                <Button variant="link" className="p-0 text-primary font-semibold">
                  Get Started →
                </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* For Drivers */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="mb-6">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Drivers</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Earn money on your own schedule by giving rides to fellow students.
                </p>
              <Link href="/driver/register">
                <Button variant="link" className="p-0 text-primary font-semibold">
                  Get Started →
                </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
