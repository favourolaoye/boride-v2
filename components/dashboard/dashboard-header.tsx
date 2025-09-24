import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export function DashboardHeader() {
  return (
    <header className="flex p-6 justify-center bg-white border-b border-gray-200">
        <div className="flex justify-between items-center w-full md:w-[80%]">
        <div className="flex items-center">
        <Image src="/boride-black-crop.PNG" width={100} height={100} alt="boride" priority/>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
          Logout
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/abstract-profile.png" alt="User" />
          <AvatarFallback>s</AvatarFallback>
        </Avatar>
      </div>
        </div>
    </header>
  )
}
