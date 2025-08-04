"use client"

import { useState } from "react"
import { Trophy, Award, Users, GraduationCap, Settings, LogOut, Bell, Mail, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function CompetitionDetails() {
  const [formData, setFormData] = useState({
    title: "Fanni mobtaker",
    description: "Fanni mobtaker description",
    type: "Local Competition",
    registrationLink: "https://FanniMobtaker.com",
    deadline: "15 / 8 / 2025",
    allowTeams: "Yes",
    teamSizeLimit: "4 members",
  })

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
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Competition details</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/competitions" className="hover:text-gray-700">
                  Competitions
                </Link>
                <span>{">"}</span>
                <span className="text-red-500">Fanni mobtaker</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
                <nav className="space-y-2">
                  <Link
                    href="/"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trophy className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/grants"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Award className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <GraduationCap className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-5 h-5" />
                  </Link>
                </nav>
              </div>

              <div className="pt-8">
                <nav className="space-y-2">
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="bg-red-500 text-white p-6 rounded-t-lg mb-6">
              <h2 className="text-xl font-semibold text-center">Fanni mobtaker details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Type</label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Registration Link</label>
                  <Input
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Deadline</label>
                    <Input
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Allow Teams</label>
                    <Input
                      value={formData.allowTeams}
                      onChange={(e) => setFormData({ ...formData, allowTeams: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Team Size Limit</label>
                  <Input
                    value={formData.teamSizeLimit}
                    onChange={(e) => setFormData({ ...formData, teamSizeLimit: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Right Side - Images */}
              <div className="space-y-6">
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-64">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Competition illustration"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg p-4 h-20 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=60&width=80"
                        alt={`Thumbnail ${i}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-red-500 hover:bg-red-600">BACK</Button>
              </div>
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
            <Badge className="bg-red-500 hover:bg-red-600 mb-4">Fanni Mobtaker</Badge>
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

          <Button className="w-full mt-8 bg-red-500 hover:bg-red-600">Update Competition</Button>
        </aside>
      </div>
    </div>
  )
}
