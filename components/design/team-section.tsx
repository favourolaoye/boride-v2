import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembers = [
  {
    name: "John Doe",
    role: "Lead Developer",
    avatar: "/alex.jpg",
    initials: "JD",
  },
  {
    name: "Jane Smith",
    role: "UI/UX Designer",
    avatar: "/alex.jpg",
    initials: "JS",
  },
  {
    name: "Samuel Green",
    role: "Backend Engineer",
    avatar: "/alex.jpg",
    initials: "SG",
  },
  {
    name: "Emily White",
    role: "Project Manager",
    avatar: "/alex.jpg",
    initials: "EW",
  },
]

export function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
          <p className="text-xl text-gray-600">The passionate individuals who brought RideOn to life.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="text-lg font-semibold">{member.initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
