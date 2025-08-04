"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function CompetitionDetailsPage({ params }: { params: { id: string } }) {
  const [competition, setCompetition] = useState({
    id: params.id,
    title: "Fanni mobtaker",
    description: "Fanni mobtaker description",
    type: "Local Competition",
    registrationLink: "https://FanniMobtaker.com",
    deadline: "15 / 8 / 2025",
    allowTeams: "Yes",
    teamSizeLimit: "4 members",
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
          <Link href="/competitions" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Competitions
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Card>
              <CardContent className="p-0">
                <div className="bg-red-500 text-white p-4 rounded-t-lg">
                  <h2 className="text-xl font-semibold text-center">Fanni mobtaker details</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <Input id="title" name="title" value={competition.title} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={competition.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <Input id="type" name="type" value={competition.type} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-700">
                      Registration Link
                    </label>
                    <Input
                      id="registrationLink"
                      name="registrationLink"
                      value={competition.registrationLink}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                        Deadline
                      </label>
                      <Input id="deadline" name="deadline" value={competition.deadline} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="allowTeams" className="block text-sm font-medium text-gray-700">
                        Allow Teams
                      </label>
                      <Input id="allowTeams" name="allowTeams" value={competition.allowTeams} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="teamSizeLimit" className="block text-sm font-medium text-gray-700">
                      Team Size Limit
                    </label>
                    <Input
                      id="teamSizeLimit"
                      name="teamSizeLimit"
                      value={competition.teamSizeLimit}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-end">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Update Competition
              </Button>
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

                  <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">Back</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
