"use client"
import { Search, Trophy, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function AllCompetitionsPage() {
  const competitions = [
    {
      id: 1,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "local",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "local",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "local",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "local",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "international",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "international",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "international",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Fanni Mobtaker",
      type: "international",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/school-logo.png"
                  alt="Elsewedy School"
                  width={32}
                  height={32}
                  className="rounded-full"
                  priority
                />
              </div>
              <span className="text-xl font-semibold text-gray-900">Elsewedy School</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search your Competition here..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Your Profile</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">OVER VIEW</h3>
                <nav className="space-y-2">
                  <Link
                    href="/"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/competitions"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Competitions</span>
                  </Link>
                  <Link
                    href="/all-competitions"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border-l-4 border-red-500"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>All Competitions</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">All Competitions</h1>
          </div>

          {/* Competitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {competitions.map((competition) => (
              <Card key={competition.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={competition.image || "/placeholder.svg"}
                      alt={competition.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">{competition.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{competition.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{competition.author}</p>
                        <p className="text-xs text-gray-500">{competition.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Profile */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="/student-profile.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="font-semibold text-gray-900">Mohamed Hanafy</h3>
            <p className="text-sm text-gray-500 mb-4">Continue Your Journey And Achieve Your Target</p>
          </div>

          <div className="mb-6">
            <Badge className="bg-red-500 hover:bg-red-600 mb-4">Fanni Mobtaker</Badge>
            <div className="flex justify-end mb-4">
              <div className="flex space-x-1">
                <div className="w-6 h-10 bg-red-300 rounded-sm"></div>
                <div className="w-6 h-12 bg-red-400 rounded-sm"></div>
                <div className="w-6 h-14 bg-red-500 rounded-sm"></div>
                <div className="w-6 h-16 bg-red-600 rounded-sm"></div>
                <div className="w-6 h-18 bg-red-700 rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Fanni mobtaker</span>
              </div>
              <span className="text-sm font-medium">21 Team</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Competition 2</span>
              </div>
              <span className="text-sm font-medium">10 Team</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Competition 3</span>
              </div>
              <span className="text-sm font-medium">0 Team</span>
            </div>
          </div>

          <Link href="/competitions/new">
            <Button className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white">New Competition</Button>
          </Link>
        </aside>
      </div>
    </div>
  )
}
