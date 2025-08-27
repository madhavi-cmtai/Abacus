"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, PhoneCall } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name:"Services", herf:"/services"},
    { name: "Franchise", href: "/franchise" },
    { name: "About Us", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Testimonials", href: "/testimonials" },
    // { name:"FAQ", herf:"/faq"},
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Image and Text */}
          <div className="flex items-center space-x-2">
            {/* Replace '/logo.png' with your actual logo path */}
            {/* <Image
              src="/logo.png"
              alt="GETS Abacus Logo"
              className="w-10 h-10 rounded-lg object-cover animate-bounce-gentle"
              height={60}
              width={120}
            /> */}
            <span className="text-xl font-bold text-primary">
              Abakus Education
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                // Remove default underline, add only custom underline, and set hover text color to red-600
                className="text-black font-medium transition-all duration-300 relative group hover:text-red-600"
                style={{ textDecoration: "none" }}
              >
                {item.name}
                {/* Only one underline on hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              className="ml-6 px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300 flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-black font-medium transition-colors duration-300 hover:text-red-600"
                  style={{ textDecoration: "none" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {/* Contact Button (Mobile) */}
              <a
                href="#contact"
                className="mt-2 px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 via-red-500 to-red-600 shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-300 text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <PhoneCall className="w-5 h-5" />
                Contact Us
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
