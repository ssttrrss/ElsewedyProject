"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function NewCompetitionPage() {
  const [competition, setCompetition] = useState({
    title: "",
    description: "",
    type: "",
    registrationLink: "",
    deadline: "",
    allowTeams: "",
    teamSizeLimit: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompetition((prev) => ({ ...prev, [name]: value }))
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
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Link href="/competitions" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Competitions
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">New Competition</h1>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            <Link href="/">Competitions</Link> &gt; <span>Add New Competition</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Card>
              <CardContent className="p-0">
                <div className="bg-red-500 text-white p-4 rounded-t-lg">
                  <h2 className="text-xl font-semibold text-center">Enter your information</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Type title here"
                      value={competition.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Type Description here"
                      value={competition.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="Select Competition type"
                      value={competition.type}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-700">
                      Registration Link
                    </label>
                    <Input
                      id="registrationLink"
                      name="registrationLink"
                      placeholder="Type Registration Link here"
                      value={competition.registrationLink}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                        Deadline
                      </label>
                      <Input
                        id="deadline"
                        name="deadline"
                        placeholder="Type Deadline here"
                        value={competition.deadline}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="allowTeams" className="block text-sm font-medium text-gray-700">
                        Allow Teams
                      </label>
                      <Input
                        id="allowTeams"
                        name="allowTeams"
                        placeholder="Yes Or No"
                        value={competition.allowTeams}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="teamSizeLimit" className="block text-sm font-medium text-gray-700">
                      Team Size Limit
                    </label>
                    <Input
                      id="teamSizeLimit"
                      name="teamSizeLimit"
                      placeholder="Type Team Size Limit here"
                      value={competition.teamSizeLimit}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-between">
              <Button variant="outline">Clear All</Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white">Add</Button>
            </div>
          </div>

          <div className="w-full lg:w-80">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Competition"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Competition thumbnail"
                      className="w-full h-auto rounded-md"
                    />
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Competition thumbnail"
                      className="w-full h-auto rounded-md"
                    />
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Competition thumbnail"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
