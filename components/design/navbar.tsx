"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.8
            setIsScrolled(window.scrollY > heroHeight)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 ${isScrolled ? "bg-white border-b border-gray-100" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    {isScrolled ? (
                        <Image
                            src="/boride-black.png"
                            alt="RideOn"
                            width={120}
                            height={100}
                            className="h-20 w-auto"
                            priority
                        />
                    ) : (
                        <Image
                            src="/boride-white.png"
                            alt="RideOn"
                            width={120}
                            height={100}
                            className="h-20 w-auto"
                            priority
                        />
                    )}
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="#"
                        className={`font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white hover:text-gray-200"
                            }`}
                    >
                        Safety
                    </a>
                    <a
                        href="#"
                        className={`font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white hover:text-gray-200"
                            }`}
                    >
                        Help
                    </a>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    {/* Student Link */}
                    <Link
                        href="/student/register"
                        className="hidden sm:inline-flex"
                    >
                        <Button
                            variant="ghost"
                            className={`transition-all bg-transparent hover:bg-transparent hover:underline ${isScrolled ? "text-black" : "text-white"
                                }`}
                        >
                            Student
                        </Button>
                    </Link>

                    {/* Driver Link */}
                    <Link href="/driver/register">
                        <Button
                            className="bg-blue-950 text-white hover:bg-blue-900 rounded-sm"
                        >
                            Driver
                        </Button>
                    </Link>
                </div>

            </div>
        </nav>
    )
}
