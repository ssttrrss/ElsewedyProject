"use client"
import { Search, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function GrantsPage() {
  const grants = [
    {
      id: 1,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Scholarship",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Scholarship",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Scholarship",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Scholarship",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Scholarship",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      author: "Prashant Kumar Singh",
      role: "Software Developer",
      category: "Scholarship",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const studentProfile = {
    name: "John Doe",
    image: "/student-profile.jpg", // Replace with the actual path to the student's profile image
  }

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
              <Input placeholder="Search your Grants here..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <Image
                src={studentProfile.image || "/placeholder.svg"}
                alt={studentProfile.name}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <span className="text-sm font-medium">{studentProfile.name}</span>
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
                    <Award className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/competitions"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Award className="w-5 h-5" />
                    <span>Competitions</span>
                  </Link>
                  <Link
                    href="/grants"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border-l-4 border-red-500"
                  >
                    <Award className="w-5 h-5" />
                    <span>Scholarships</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-2">Boost your potential with inspiring Scholarships</h2>
            <p className="mb-4">Find the perfect scholarship to help you achieve your academic goals</p>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-red-600 bg-transparent"
            >
              More Scholarships
            </Button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
          </div>

          {/* Grants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grants.map((grant) => (
              <Card key={grant.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={grant.image || "/placeholder.svg"}
                      alt={grant.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">{grant.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{grant.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{grant.author}</p>
                        <p className="text-xs text-gray-500">{grant.role}</p>
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

        {/* Right Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Grant 1</span>
                </div>
                <span className="text-sm font-medium">5 days left</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Grant 2</span>
                </div>
                <span className="text-sm font-medium">7 days left</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Grant 3</span>
                </div>
                <span className="text-sm font-medium">15 days left</span>
              </div>
            </div>
          </div>

          <Link href="/grants/new">
            <Button className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white">New Grant</Button>
          </Link>
        </aside>
      </div>
    </div>
  )
}
