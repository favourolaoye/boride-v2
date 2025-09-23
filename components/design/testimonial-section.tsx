import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ThumbsUp, MessageCircle } from "lucide-react"

const testimonials = [
  {
    name: "Adewale seunfunmi",
    date: "May 15, 2024",
    avatar: "/alex.jpg",
    initials: "SC",
    rating: 5,
    text: "Boride has transformed my daily commute. The drivers are always professional, and the app is incredibly user-friendly. I highly recommend it!",
    likes: 12,
    comments: 3,
  },
  {
    name: "Joy Davids",
    date: "April 22, 2024",
    avatar: "/alex.jpg",
    initials: "EM",
    rating: 5,
    text: "I've been using Boride for a few months now, and it's been a great experience. The service is reliable, and the cars are always clean. Sometimes there are delays during peak hours, but overall, it's a solid choice.",
    likes: 8,
    comments: 1,
  },
  {
    name: "Princess Oluwaloju",
    date: "March 10, 2024",
    avatar: "/alex.jpg",
    initials: "OD",
    rating: 5,
    text: "I love the convenience of Boride. It's so easy to book a ride, and I always feel safe. The drivers are friendly, and the app provides all the necessary information. Definitely my go-to for transportation!",
    likes: 15,
    comments: 4,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What people are saying</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="text-sm font-semibold">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-4">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
