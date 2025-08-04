"use client"

import { useState } from "react"
import { Search, Trophy, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function CompetitionsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

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
  ]

  const filteredCompetitions =
    activeFilter === "all" ? competitions : competitions.filter((comp) => comp.type === activeFilter)

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
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
              <Image
                src="/student-image.png"
                alt="Student Profile"
                width={40}
                height={40}
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="text-sm font-medium">Student Name</span>
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
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border-l-4 border-red-500"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Competitions</span>
                  </Link>
                  <Link
                    href="/grants"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Scholarships</span>
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

          {/* Filters */}
          <div className="mb-6 flex items-center space-x-4">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "local" ? "default" : "outline"}
              onClick={() => setActiveFilter("local")}
              className={activeFilter === "local" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              Local
            </Button>
            <Button
              variant={activeFilter === "international" ? "default" : "outline"}
              onClick={() => setActiveFilter("international")}
              className={activeFilter === "international" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              International
            </Button>
          </div>

          {/* Competitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompetitions.map((competition) => (
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
      </div>
    </div>
  )
}
