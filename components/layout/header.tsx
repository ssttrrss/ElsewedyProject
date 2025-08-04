"use client"

import { Search, Bell, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeSwitch } from "@/components/ui/mode-switch"
import { useView } from "@/contexts/view-context"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  title?: string
  searchPlaceholder?: string
}

export function Header({
  title = "Elsewedy School",
  searchPlaceholder = "Search your Competition here...",
}: HeaderProps) {
  const { setViewMode, isAdmin } = useView()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 relative">
              <Image
                src="/school-logo.png"
                alt="Elsewedy School"
                width={32}
                height={32}
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="text-xl font-semibold text-gray-900">{title}</span>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Mode Switch */}
          <ModeSwitch isAdmin={isAdmin} onModeChange={(checked) => setViewMode(checked ? "admin" : "user")} />

          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <Image
                src="/profile.jpeg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover border-2 border-red-200 group-hover:border-red-400 transition-all duration-200"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Mahmoud Ibrahem</p>
              <p className="text-gray-600 text-xs">Continue Your Journey And Achieve Your Target</p>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
