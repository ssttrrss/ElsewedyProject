"use client"

import { useState } from "react"
import { Trophy, Users, GraduationCap, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function NewCompetition() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    registrationLink: "",
    deadline: "",
    allowTeams: "",
    teamSizeLimit: "",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Elsewedy School</span>
          </Link>
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
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border-l-4 border-red-500"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>competitions</span>
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
                    <Users className="w-5 h-5" />
                    <span>Teachers</span>
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
          <div className="max-w-4xl">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">New Competition</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/competitions" className="hover:text-gray-700">
                  Competitions
                </Link>
                <span>{">"}</span>
                <span className="text-red-500">Add New Competition</span>
              </div>
            </div>

            {/* Header */}
            <div className="bg-red-500 text-white p-6 rounded-t-lg mb-6">
              <h2 className="text-xl font-semibold text-center">Enter your information</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                  <Input
                    placeholder="Type title here"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <Textarea
                    placeholder="Type Description here"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Type</label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Competition type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Competition</SelectItem>
                      <SelectItem value="international">International Competition</SelectItem>
                      <SelectItem value="national">National Competition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Registration Link</label>
                  <Input
                    placeholder="Type Registration Link here"
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Deadline</label>
                    <Input
                      placeholder="Type Deadline here"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Allow Teams</label>
                    <Select
                      value={formData.allowTeams}
                      onValueChange={(value) => setFormData({ ...formData, allowTeams: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Yes Or No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Team Size Limit</label>
                  <Input
                    placeholder="Type Team Size Limit here"
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

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                  >
                    CLEAR ALL
                  </Button>
                  <Button className="flex-1 bg-red-500 hover:bg-red-600">ADD</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
