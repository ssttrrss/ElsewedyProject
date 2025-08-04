"use client"
import {
  Search,
  Trophy,
  Award,
  Users,
  GraduationCap,
  Settings,
  LogOut,
  Bell,
  Mail,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function GrantsPage() {
  const scholarships = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: "Beginner's Guide To Becoming A Professional Frontend Developer",
    author: "Prashant Kumar Singh",
    role: "Software Developer",
    category: "Scholarship",
    image: "/placeholder.svg?height=200&width=300",
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Elsewedy School</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search your Grants here..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Your Profile</span>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
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
                    <span>competitions</span>
                  </Link>
                  <Link
                    href="/grants"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border-l-4 border-red-500"
                  >
                    <Award className="w-5 h-5" />
                    <span>Scholarships</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-5 h-5" />
                    <span>Students</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Engineers</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-5 h-5" />
                    <span>Main Admins</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-5 h-5" />
                    <span>Teams</span>
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">SETTINGS</h3>
                <nav className="space-y-2">
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 mb-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-2">Boost youe potential with inspiring</h1>
              <h2 className="text-2xl font-bold mb-4">Scholarships</h2>
              <Button className="bg-black hover:bg-gray-800 text-white">
                More Scholarships
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
            </div>
          </div>

          {/* Scholarships */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-red-500">Scholarships</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {scholarships.map((scholarship) => (
                <Link key={scholarship.id} href={`/grants/${scholarship.id}`}>
                  <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={scholarship.image || "/placeholder.svg"}
                          alt={scholarship.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                          {scholarship.category}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{scholarship.title}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{scholarship.author}</p>
                            <p className="text-xs text-gray-500">{scholarship.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Profile */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="font-semibold text-gray-900">Mohamed Hanafy Khairy</h3>
            <p className="text-sm text-gray-500 mb-4">Continue Your Journey And Achieve Your Target</p>
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <Badge className="bg-red-500 hover:bg-red-600 mb-4">Scholarship One</Badge>
            <div className="flex justify-end mb-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <div
                    key={bar}
                    className={`w-6 bg-red-${300 + bar * 100} rounded-sm`}
                    style={{ height: `${32 + bar * 8}px` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

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

          <Button className="w-full mt-8 bg-red-500 hover:bg-red-600">New Grants</Button>
        </aside>
      </div>
    </div>
  )
}
